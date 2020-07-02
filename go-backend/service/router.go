package service

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"joshsoftware/peerly/config"

	ae "joshsoftware/peerly/apperrors"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

const (
	versionHeader = "Accept"
	authHeader    = "X-Auth-Token"
)

// InitRouter -  The routing mechanism. Mux helps us define handler functions and the access methods
func InitRouter(deps Dependencies) (router *mux.Router) {
	router = mux.NewRouter()
	// No version requirement for /ping
	router.HandleFunc("/ping", pingHandler).Methods(http.MethodGet)
	// Version 1 API management
	v1 := fmt.Sprintf("application/vnd.%s.v1", config.AppName())

	//core values
	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", jwtAuthMiddleware(getCoreValueHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values", jwtAuthMiddleware(listCoreValuesHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values", jwtAuthMiddleware(createCoreValueHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", jwtAuthMiddleware(deleteCoreValueHandler(deps), deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", jwtAuthMiddleware(updateCoreValueHandler(deps), deps)).Methods(http.MethodPut).Headers(versionHeader, v1)

	//reported recognition
	router.Handle("/recognitions/{recognition_id:[0-9]+}/report", jwtAuthMiddleware(createReportedRecognitionHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//recognition moderation
	router.Handle("/recognitions/{recognition_id:[0-9]+}/review", jwtAuthMiddleware(createRecognitionModerationHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//users
	router.Handle("/users", jwtAuthMiddleware(listUsersHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/users/{id:[0-9]+}", jwtAuthMiddleware(getUserHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/users/{id:[0-9]+}", jwtAuthMiddleware(updateUserHandler(deps), deps)).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.Handle("/users/{email}", jwtAuthMiddleware(getUserByEmailHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	// Basic logout
	router.Handle("/logout", jwtAuthMiddleware(handleLogout(deps), deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	// TODO: Finish login system
	router.HandleFunc("/auth/google", handleAuth(deps)).Methods(http.MethodGet)

	// organizations routes
	router.Handle("/organizations", jwtAuthMiddleware(listOrganizationHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", jwtAuthMiddleware(getOrganizationHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{domainName}", jwtAuthMiddleware(getOrganizationByDomainNameHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations", jwtAuthMiddleware(createOrganizationHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", jwtAuthMiddleware(deleteOrganizationHandler(deps), deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", jwtAuthMiddleware(updateOrganizationHandler(deps), deps)).Methods(http.MethodPut).Headers(versionHeader, v1)

	// badges routes
	router.Handle("/organizations/{organization_id:[0-9]+}/badges", jwtAuthMiddleware(createBadgeHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges", jwtAuthMiddleware(listBadgesHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", jwtAuthMiddleware(updateBadgeHandler(deps), deps)).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", jwtAuthMiddleware(showBadgeHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", jwtAuthMiddleware(deleteBadgeHandler(deps), deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	// Get S3 signed URL
	router.Handle("/s3_signed_url", jwtAuthMiddleware(getS3SignedURLHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	// Recognition Hi5 routes

	router.Handle("/recognitions/{recognition_id:[0-9]+}/hi5", jwtAuthMiddleware(createRecognitionHi5Handler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	// Recognitions
	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions", jwtAuthMiddleware(createRecognitionHandler(deps), deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions/{recognition_id:[0-9]+}", jwtAuthMiddleware(getRecognitionHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions", jwtAuthMiddleware(listRecognitionsHandler(deps), deps)).Methods(http.MethodGet).Headers(versionHeader, v1)
	return
}

// JWT token verification
func jwtAuthMiddleware(next http.Handler, deps Dependencies) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		totalFields := 2
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")

		if len(authHeader) != totalFields {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Malformed Token"))
			return
		}
		jwtToken := authHeader[1]
		token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}

			return []byte(config.JWTKey()), nil
		})

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok && !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}

		ctx := context.WithValue(r.Context(), "props", claims)
		userID, err := strconv.Atoi(claims["sub"].(string))
		if err != nil {
			logger.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
			return
		}

		orgID, err := strconv.Atoi(claims["org"].(string))
		if err != nil {
			logger.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
			return
		}

		currentUser, err := deps.Store.GetUser(ctx, userID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching User")
			return
		}

		nextContext := context.WithValue(ctx, "user", token)
		if currentUser.OrgID != orgID {
			err = ae.ErrInvalidToken
			logger.WithField("err", err.Error()).Error("Mismatch with user organization and current organization")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r.WithContext(nextContext))
	})
}
