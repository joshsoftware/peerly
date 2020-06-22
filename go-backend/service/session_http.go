package service

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	logger "github.com/sirupsen/logrus"
	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	log "joshsoftware/peerly/util/log"
)

// OAuthUser - a struct that represents the "user" we'll get back from Google's /userinfo query
type OAuthUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	Domain        string `json:"hd"`
	VerifiedEmail bool   `json:"verified_email"`
	PictureURL    string `json:"picture"`
}

// OAuthToken - a struct used to json.Unmarshal the response body from an oauth provider
type OAuthToken struct {
	AccessToken  string `json:"access_token"`
	IDToken      string `json:"id_token"`
	ExpiresIn    int    `json:"expires_in"`
	TokenType    string `json:"token_type"`
	Scope        string `json:"scope"`
	RefreshToken string `json:"refresh_token"`
}

// authBody - a struct we use for marshalling into JSON to send down as the response body after a user has been
// successfully authenticated and they need their token for using the app in subsequent API requests
// (see the 'handleAuth' function below).
type authBody struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}

func handleAuth(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// We're going to use req.Context() a lot here, so create a simple variable first
		ctx := req.Context()

		// We should have a URL-encoded parameter called "authCode" here, which we use
		// to exchange for an auth *token* from Google via oauth 2.
		auth, ok := req.URL.Query()["code"]
		if !ok || len(auth[0]) < 1 {
			log.Error(ae.ErrNoAuthCode, "No 'code' URL parameter provided", ae.ErrNoAuthCode)
			ae.JSONError(rw, http.StatusForbidden, ae.ErrNoAuthCode)
			return
		}

		// Now, exchange the authCode for an authentication *token* with the OAuth provider
		// To do this, we do a POST to https://oauth2.googleapis.com/token which will respond
		// with a 200 OK and a JSON response body containing keys for access_token, id_token,
		// expires_in, token_type, scope and refresh_token
		resp, err := http.PostForm("https://oauth2.googleapis.com/token",
			url.Values{
				"code":          {auth[0]},
				"client_id":     {config.ReadEnvString("GOOGLE_KEY")},
				"client_secret": {config.ReadEnvString("GOOGLE_SECRET")},
				"scope":         {""},
				"grant_type":    {"authorization_code"},
				"redirect_uri":  {config.ReadEnvString("GOOGLE_REDIRECT")},
			},
		)

		// TEST URL (FXIME: Delete this from final prod code, leaving it here for future debugging if needed)
		// https://accounts.google.com/o/oauth2/auth?client_id=749817093280-6h2emqcqsi84murdsdr543kuemvrlr9t.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A33001%2Fauth%2Fgoogle&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=state

		if err != nil {
			log.Error(ae.ErrAuthCodeRequestFail, "Google didn't like the auth code we sent", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		var token OAuthToken
		payload, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Error(ae.ErrReadingResponseBody, "Error reading response body: "+string(payload), err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		err = json.Unmarshal(payload, &token)
		if err != nil {
			log.Error(ae.ErrJSONParseFail, "json.Unmarshal error on payload "+string(payload), err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		client := &http.Client{}
		req, err = http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
		if err != nil {
			log.Error(ae.ErrHTTPRequestFailed, "Failed to create oauth request", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		req.Header.Set("Authorization", "Bearer "+token.AccessToken)
		resp, err = client.Do(req)
		if err != nil {
			log.Error(ae.ErrHTTPRequestFailed, "Failure executing HTTP request to https://www.googleapis.com/oauth2/v2/userinfo", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		user := OAuthUser{}
		payload, err = ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Error(ae.ErrReadingResponseBody, "Error reading response body: "+string(payload), err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		err = json.Unmarshal(payload, &user)
		if err != nil {
			log.Error(ae.ErrJSONParseFail, "Failure parsing JSON in Unmarshalling OAuthUser"+string(payload), err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
		}

		// Before going any further, check to see if a domain actually exists on the user object, because
		// if not, then there's no point in going any further.
		if len(user.Domain) < 3 { // Shortest possible FQDN would be y.z
			log.Error(ae.ErrNoUserDomain, "No valid domain associated with user "+user.Email+" (domain: "+user.Domain+")", ae.ErrNoUserDomain)
			ae.JSONError(rw, http.StatusForbidden, ae.ErrNoUserDomain)
			return
		}

		// Check the OAuth User's domain and see if it's already in our database
		// TODO - We need a way to test this both programmatically and by hand.
		// That necessitates a Google account associated w/ a domain that isn't Josh Software
		org, err := deps.Store.GetOrganizationByDomainName(ctx, user.Domain)
		if err != nil {
			// Log error, push out a JSON response, and halt authentication
			log.Error(ae.ErrDomainNotRegistered(user.Email), ("Domain: " + user.Domain + " Email " + user.Email), err)
			ae.JSONError(rw, http.StatusForbidden, err)
			return
		}

		// See if there's an existing user that matches the oAuth user
		existingUser, err := deps.Store.GetUserByEmail(ctx, user.Email)
		if err != nil && err != ae.ErrRecordNotFound {
			log.Error(ae.ErrUnknown, "Unknown/unexpected error while looking for existing user "+user.Email, err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		if err == ae.ErrRecordNotFound {
			// Organization DOES exist in the database. Create the user.
			existingUser, err = deps.Store.CreateNewUser(ctx, db.User{
				Email:           user.Email,
				ProfileImageURL: user.PictureURL,
				OrgID:           org.ID,
			})
			if err != nil {
				log.Error(ae.ErrUnknown, "Unknown/unexpected error while creating new user "+user.Email, err)
				ae.JSONError(rw, http.StatusInternalServerError, err)
				return
			}
		}

		// By the time we get here, we definitely have an existingUser object.
		// Looks like a valid user authenticated by Google. User's org is in our orgs table. Issue a JWT.
		authToken, err := newJWT(existingUser.ID, org.ID)
		if err != nil {
			log.Error(ae.ErrUnknown, "Unknown/unexpected error while creating JWT for "+existingUser.Email, err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		// If we get this far, we have a valid authToken. Go ahead and return it to the client.
		respBody, err := json.Marshal(authBody{Message: "Authentication Successful", Token: authToken})
		if err != nil {
			log.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response, token: "+authToken, err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}
		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-type", "application/json")
		rw.Header().Add("Authorization", authToken)
		rw.Write(respBody)

	}) // End HTTP handler
}

// newJWT() - Creates and returns a new JSON Web Token to be sent to an API consumer on valid
// authentication, so they can re-use it by sending it in the Authorization header on subsequent
// requests.
func newJWT(userID, organizationID int) (newToken string, err error) {
	signingKey := config.JWTKey()
	if signingKey == nil {
		log.Error(ae.ErrNoSigningKey, "Application error: No signing key configured", err)
		return
	}

	expiryTime := time.Now().Add(time.Duration(config.JWTExpiryDurationHours()) * time.Hour).Unix()
	claims := &jwt.MapClaims{
		"exp": expiryTime,
		"iss": "joshsoftware.com",
		"iat": time.Now().Unix(),
		"sub": strconv.Itoa(userID),
		"org": strconv.Itoa(organizationID),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	newToken, err = token.SignedString(signingKey)
	if err != nil {
		log.Error(ae.ErrSignedString, "Failed to get signed string", err)
		return
	}
	return
}

func handleLogout(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		parsedToken := req.Context().Value("user").(*jwt.Token)
		claims := parsedToken.Claims.(jwt.MapClaims)

		userID, err := strconv.Atoi(claims["sub"].(string))
		if err != nil {
			log.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		expirationTimeStamp := int64(claims["exp"].(float64))

		expirationDate := time.Unix(expirationTimeStamp, 0)
		userBlackListedToken := db.UserBlacklistedToken{
			UserID:         userID,
			ExpirationDate: expirationDate,
			Token:          parsedToken.Raw,
		}

		err = deps.Store.CreateUserBlacklistedToken(req.Context(), userBlackListedToken)
		if err != nil {
			log.Error(ae.ErrFailedToCreate, "Error creating blaclisted token record", err)
			rw.Header().Add("Content-Type", "application/json")
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}
		rw.Header().Add("Content-Type", "application/json")
		return
	})
}

// validateJWTToken() - validates and returns a user id, orgnization id and error.
func validateJWTToken(ctx context.Context, storer db.Storer) (userID, orgID int, err error) {
	parsedToken := ctx.Value("user").(*jwt.Token)
	claims := parsedToken.Claims.(jwt.MapClaims)

	userID, err = strconv.Atoi(claims["sub"].(string))
	if err != nil {
		logger.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
		return
	}

	orgID, err = strconv.Atoi(claims["org"].(string))
	if err != nil {
		logger.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
		return
	}

	currentUser, err := storer.GetUser(ctx, userID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while fetching User")
		return
	}

	if currentUser.OrgID != orgID {
		err = ae.ErrInvalidToken
		logger.WithField("err", err.Error()).Error("Mismatch with user organization and current organization")
	}

	return
}
