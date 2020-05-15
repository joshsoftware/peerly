package service

import (
	"database/sql"
	"encoding/json"
	"io/ioutil"
	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	log "joshsoftware/peerly/util/log"
	"net/http"
	"net/url"

	jwt "github.com/dgrijalva/jwt-go"
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
		req, _ = http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
		req.Header.Set("Authorization", "Bearer "+token.AccessToken)
		resp, err = client.Do(req)
		if err != nil {
			log.Error(ae.ErrHTTPRequestFailed, "Failure executing HTTP request to https://www.googleapis.com/oauth2/v2/userinfo", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		user := OAuthUser{}
		payload, _ = ioutil.ReadAll(resp.Body)
		err = json.Unmarshal(payload, &user)
		if err != nil {
			log.Error(ae.ErrJSONParseFail, "Failure parsing JSON in Unmarshalling OAuthUser"+string(payload), err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
		}

		// Before going any further, check to see if a domain actually exists on the user object, because
		// if not, then there's no point in going any further.
		if len(user.Domain) < 3 { // Shortest possible FQDN would be y.z
			log.Error(ae.ErrNoUserDomain, "No valid domain associated with user "+user.Email+" (domain: "+user.Domain+")", err)
			ae.JSONError(rw, http.StatusForbidden, err)
			return
		}

		// See if there's an existing user that matches the oAuth user
		existingUser, err := deps.Store.GetUserByEmail(ctx, user.Email)
		if err != nil && err != sql.ErrNoRows {
			log.Error(ae.ErrUnknown, "Unknown/unexpected error while looking for existing user "+user.Email, err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		} else {
			// Check the OAuth User's domain and see if it's already in our database
			org, err := deps.Store.GetOrganizationByDomainName(ctx, user.Domain)
			if err != nil {
				// Log error, push out a JSON response, and halt authentication
				log.Error(ae.ErrDomainNotRegistered, ("Domain: " + user.Domain + " Email " + user.Email), err)
				ae.JSONError(rw, http.StatusForbidden, err)
				return
			}

			// Organization DOES exist in the database. Create the user.
			_, err = deps.Store.CreateNewUser(ctx, db.User{
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

		// Re-query the database for existingUser
		existingUser, err = deps.Store.GetUserByEmail(ctx, user.Email)
		if err != nil {
			// If we can't retrieve the user after we just created them, something very, very weird is going on.
			log.Error(ae.ErrUnknown, "Unknown/unexpected error while looking up user "+user.Email, err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		// By the time we get here, we definitely have an existingUser object.
		// Looks like a valid user authenticated by Google. User's org is in our orgs table. Issue a JWT.
		authToken, err := newJWT(existingUser.Email)
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
func newJWT(email string) (newToken string, err error) {
	signingKey := config.JwtKey()
	if signingKey == nil {
		log.Error(ae.ErrNoSigningKey, "Application error: No signing key configured", err)
		return
	}

	claims := &jwt.StandardClaims{
		ExpiresAt: 15000,
		Issuer:    "joshsoftware.com",
		IssuedAt:  9999, // TODO: What should actually go here? time.Now() * time.Second? Seconds since UNIX epoch?
		Subject:   email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	newToken, err = token.SignedString(signingKey)
	if err != nil {
		// Error signing the token for some reason.
		// TODO: Log the error
	}
	return
}

/*
type Claims struct {
	UserID         int       `json:"user_id"`
	ExpirationDate time.Time `json:"expiration_date"`
	jwt.StandardClaims
}
*/

/*
func getClaims(token string) (claims *Claims, err error) {
	// Initialize a new instance of `Claims`
	claims = &Claims{}

	var newTkn *jwt.Token
	newTkn, err = jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
		return config.JwtKey(), nil
	})

	if err != nil {
		// TODO: Log that jwt.ParseWithClaims failed somehow
		return
	}

	if !newTkn.Valid {
		err = errInvalidToken
	}

	return
}
*/

/*
func handleLogout(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		token := req.Header.Get(authHeader)
		if token == "" {
			rw.WriteHeader(http.StatusBadRequest)
			log.Error(errMissingAuthHeader, "Auth header is missing", req.Header.Get(authHeader))
			return
		}

		claims, err := getClaims(token)
		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				rw.WriteHeader(http.StatusUnauthorized)
				return
			} else if err == errInvalidToken {
				rw.WriteHeader(http.StatusUnauthorized)
				return
			}
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		userBlackListedToken := db.UserBlacklistedToken{
			UserID:         claims.UserID,
			ExpirationDate: claims.ExpirationDate,
			Token:          token,
		}
		log.Info(token)

		err = deps.Store.CreateUserBlacklistedToken(req.Context(), userBlackListedToken)
		if err != nil {
			respBytes, _ := json.Marshal(struct {
				status  int
				message string
			}{
				status:  http.StatusInternalServerError,
				message: "Internal server error inserting token into blacklisted tokens table",
			})

			rw.WriteHeader(http.StatusInternalServerError)
			rw.Header().Add("Content-Type", "application/json")
			rw.Write(respBytes)
			return
		}

		return
	})
}
*/
