package service

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	"net/http"
	"net/url"
	"time"

	"github.com/dgrijalva/jwt-go"
	logger "github.com/sirupsen/logrus"
)

// Claims - for use with JWT
type Claims struct {
	UserID         int64     `json:"user_id"`
	ExpirationDate time.Time `json:"expiration_date"`
	jwt.StandardClaims
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

var errInvalidToken = errors.New("Invalid Token")
var errNoAuthCode = errors.New("authCode URL parameter missing")
var errMissingAuthHeader = errors.New("Missing Auth header")

func handleAuth(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// We should have a URL-encoded parameter called "authCode" here, which we use
		// to exchange for an auth *token* from Google via oauth 2.
		auth, ok := req.URL.Query()["authCode"]
		if !ok || len(auth[0]) < 1 {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", errNoAuthCode.Error()).Error("authCode URL parameter missing")
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
				"client_id":     {"TODO: Client ID"},
				"client_secret": {"TODO: Client Secret"},
				"scope":         {""},
				"grant_type":    {"authorization_code"},
			},
		)

		if err != nil {
			// TODO: Handle the error
			// 1. Log it here
			// 2. Send an unauthorized http header to our client
			// 3. Include a JSON message that says the auth provider denied auth code <-> token exchange
			return
		}

		var token []OAuthToken
		payload, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			// TODO: Handle error - unable to parse OAuth provider response body *prior* to JSON decode
			return
		}
		err = json.Unmarshal(payload, &token)
		if err != nil {
			// TODO: Handle error - unable to decode JSON received from OAuth provider
			return
		}

		// If we get here, we have valid data in the token struct,
		// Use it to get information with the userinfo.email scope
		// TODO

		// Once we have that information, we can check if the user's organization exists in our DB
		// TODO

		// And if they do, log them in
		// TODO
	})
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
			logger.WithField("err", errMissingAuthHeader.Error()).Error("Auth Header missing")
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
		logger.Info(token)

		err = deps.Store.CreateUserBlacklistedToken(req.Context(), userBlackListedToken)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		return
	})
}
