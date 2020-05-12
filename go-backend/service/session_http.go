package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	log "joshsoftware/peerly/util/log"
	"net/http"
	"net/url"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Claims - for use with JWT
type Claims struct {
	UserID         int64     `json:"user_id"`
	ExpirationDate time.Time `json:"expiration_date"`
	jwt.StandardClaims
}

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
	ExpiresIn    int32  `json:"expires_in"`
	TokenType    string `json:"token_type"`
	Scope        string `json:"scope"`
	RefreshToken string `json:"refresh_token"`
}

// ErrorStruct - a generic struct you can use to create error messages/logs to be converted
// to JSON or other types of messages/data as you need it
type ErrorStruct struct {
	Message string `json:"message"` // Your message to the end user or developer
	Status  int32  `json:"status"`  // HTTP status code that should go with the message/log (if any)
	Sample  string `json:"sample"`  // A placeholder for any debug logging you want, (e.g. response body or something)
}

var errInvalidToken = errors.New("Invalid Token")
var errNoAuthCode = errors.New("authCode URL parameter missing")
var errMissingAuthHeader = errors.New("Missing Auth header")
var errAuthCodeRequestFail = errors.New("Request for OAuth 2.0 authorization token failed")
var errJSONParseFail = errors.New("Failed to parse JSON response (likely not valid JSON)")
var errReadingResponseBody = errors.New("Could not read HTTP response body")
var errHTTPRequest = errors.New("HTTP Request Failed")

func handleAuth(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// We should have a URL-encoded parameter called "authCode" here, which we use
		// to exchange for an auth *token* from Google via oauth 2.
		auth, ok := req.URL.Query()["code"]
		if !ok || len(auth[0]) < 1 {
			rw.WriteHeader(http.StatusBadRequest)
			log.Error(errNoAuthCode, "No 'code' URL parameter provided", req.URL.String())
			return
		}

		// http.Request.URL.Query() returns an array even for only one thing, and we just want
		// that one value only
		authCode := auth[0]

		// Now, exchange the authCode for an authentication *token* with the OAuth provider
		// To do this, we do a POST to https://oauth2.googleapis.com/token which will respond
		// with a 200 OK and a JSON response body containing keys for access_token, id_token,
		// expires_in, token_type, scope and refresh_token
		resp, err := http.PostForm("https://oauth2.googleapis.com/token",
			url.Values{
				"code":          {authCode},
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
			// TODO: Handle the error
			// 1. Log it here
			// 2. Send an unauthorized http header to our client
			// 3. Include a JSON message that says the auth provider denied auth code <-> token exchange
			body, _ := ioutil.ReadAll(resp.Body)
			log.Error(errAuthCodeRequestFail, "Google didn't like the auth code we sent", string(body))
			rw.WriteHeader(http.StatusUnauthorized)
			rw.Write(JSONError(ErrorStruct{Message: errAuthCodeRequestFail.Error(), Status: http.StatusUnauthorized}))
			return
		}

		var token OAuthToken
		payload, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Error(errReadingResponseBody, "Error reading response body", string(payload))
			return
		}

		err = json.Unmarshal(payload, &token)
		if err != nil {
			log.Error(errJSONParseFail, "Error when running json.Unmarshal on payload", string(payload))
			rw.Write(JSONError(ErrorStruct{Message: errJSONParseFail.Error(), Sample: string(payload)}))
			// TODO: Handle error - unable to decode JSON received from OAuth provider
			return
		}

		// If we get here, we have valid data in the token struct,
		// Use it to get information with the userinfo.email scope
		// TODO
		// GET https://www.googleapis.com/oauth2/v2/userinfo
		// Authorization: Bearer <token>
		//
		// { picture, verified_email, id, hd(domain), email }
		client := &http.Client{}
		req, _ = http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
		req.Header.Set("Authorization", "Bearer "+token.AccessToken)
		resp, err = client.Do(req)
		if err != nil {
			log.Error(errHTTPRequest, "HTTP Request possibly failed", err.Error())
		}

		user := OAuthUser{}
		payload, _ = ioutil.ReadAll(resp.Body)
		err = json.Unmarshal(payload, &user)
		if err != nil {
			log.Error(errJSONParseFail, "Failure parsing JSON in Unmarshalling OAuthUser", string(payload))
		}

		fmt.Printf(string(payload))

		// Check to make sure we have the user's domain, id and email properties
		if user.ID != "" && user.Email != "" && user.Domain != "" {
			// TODO: Check to see if that user's domain is in our organizations table
			// TODO: If not, hard stop here and return an error with a nil user object

			// Debugging for now...
			fmt.Printf("%+v\n", user)
		}

		// TODO: Looks like a valid user authenticated by Google. User's org is in our orgs table. Issue a JWT.
		return
	})
}

// JSONError - create a JSON string that can be used to report error messages in
// response bodies or logs.
// Example usage:
//	fmt.Printf(JSONError(ErrorStruct{
//		Message:"thing went wrong",
//		Status:"400",
//		Sample:"some debug info, maybe a response body or something"
//	}))
func JSONError(errObj ErrorStruct) (payload []byte) {
	payload, err := json.Marshal(errObj)
	if err != nil {
		log.Error(errJSONParseFail, "Failure parsing JSON in service.JSONError()", string(payload))
		return
	}
	return
}

func getClaims(token string) (claims *Claims, err error) {
	// Initialize a new instance of `Claims`
	claims = &Claims{}

	var newTkn *jwt.Token
	newTkn, err = jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return config.JwtKey(), nil
	})

	if !newTkn.Valid {
		err = errInvalidToken
		return
	}

	return
}

func handleLogout(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		token := req.Header.Get(authHeader)
		if token == "" {
			rw.WriteHeader(http.StatusBadRequest)
			log.Error(errMissingAuthHeader, "Auth header is missing", req.Header.Get(authHeader))
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
		}

		userBlackListedToken := db.UserBlacklistedToken{
			UserID:         claims.UserID,
			ExpirationDate: claims.ExpirationDate,
			Token:          token,
		}
		log.Info(token)

		err = deps.Store.CreateUserBlacklistedToken(req.Context(), userBlackListedToken)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		return
	})
}
