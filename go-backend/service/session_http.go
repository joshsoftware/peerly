package service

import (
	"errors"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/db"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	logger "github.com/sirupsen/logrus"
)

type Claims struct {
	UserID         int64     `json:"user_id"`
	ExpirationDate time.Time `json:"expiration_date"`
	jwt.StandardClaims
}

var errInvalidToken = errors.New("Invalid Token")
var errMissingAuthHeader = errors.New("Missing Auth header")

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
