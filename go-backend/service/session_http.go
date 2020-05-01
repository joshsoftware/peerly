package service

import (
	"errors"
	"fmt"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	"net/http"
	"os"
	"time"

	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"

	"github.com/dgrijalva/jwt-go"
	logger "github.com/sirupsen/logrus"
)

// Claims - for use with JWT
type Claims struct {
	UserID         int64     `json:"user_id"`
	ExpirationDate time.Time `json:"expiration_date"`
	jwt.StandardClaims
}

var errInvalidToken = errors.New("Invalid Token")
var errMissingAuthHeader = errors.New("Missing Auth header")

func handleAuthCallback(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		goth.UseProviders(
			google.New(os.Getenv("GOOGLE_KEY"), os.Getenv("GOOGLE_SECRET"), os.Getenv("OAUTH_CALLBACK_URI")),
		)

		user, err := gothic.CompleteUserAuth(rw, req)
		if err != nil {
			fmt.Fprintln(rw, err)
			// TODO: Auth failure output/logs
			return
		}

		// Successful authentication
		fmt.Printf("Auth Success: %+v\n", user)
		// TODO: Check if user is already in database and if not, create them
		// TODO: Check to see if user is soft deleted and if so, fail authentication
		// TODO: Auth success - issue jwt and serve up main front-end entry point
		return
	})
}

func handleAuthInit(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// Specify the auth provider for Gothic to use
		goth.UseProviders(
			google.New(os.Getenv("GOOGLE_KEY"), os.Getenv("GOOGLE_SECRET"), os.Getenv("OAUTH_CALLBACK_URI")),
		)

		// Try to get the user without re-authenticating; if we can't, then
		// go ahead and re-authenticate anyway.
		gothUser, err := gothic.CompleteUserAuth(rw, req)
		if err == nil {
			// Successful Auth Already In Place
			fmt.Printf("Auth already in place: %v+\n", gothUser)
		} else {
			fmt.Printf("%v+\n", err)
			// Re-initialize the auth process
			gothic.BeginAuthHandler(rw, req)
		}
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
