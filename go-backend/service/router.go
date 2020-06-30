package service

import (
	"fmt"
	"net/http"

	"joshsoftware/peerly/config"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

const (
	versionHeader = "Accept"
	authHeader    = "X-Auth-Token"
)

// InitRouter -  The routing mechanism. Mux helps us define handler functions and the access methods
func InitRouter(deps Dependencies) (router *mux.Router) {
	router = mux.NewRouter()

	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return config.JWTKey(), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})

	// No version requirement for /ping
	router.HandleFunc("/ping", pingHandler).Methods(http.MethodGet)
	// Version 1 API management
	v1 := fmt.Sprintf("application/vnd.%s.v1", config.AppName())

	//core values
	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getCoreValueHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(listCoreValuesHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createCoreValueHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(deleteCoreValueHandler(deps))),
	)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	router.Handle("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(updateCoreValueHandler(deps))),
	)).Methods(http.MethodPut).Headers(versionHeader, v1)

	//reported recognition
	router.Handle("/recognitions/{recognition_id:[0-9]+}/report", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createReportedRecognitionHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//recognition moderation
	router.Handle("/recognitions/{recognition_id:[0-9]+}/review", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createRecognitionModerationHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//users
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(listUsersHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/users/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getUserHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/users/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(updateUserHandler(deps))),
	)).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.Handle("/users/{email}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getUserByEmailHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	// Basic logout
	router.Handle("/logout", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(handleLogout(deps))),
	)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	// TODO: Finish login system
	router.HandleFunc("/auth/google", handleAuth(deps)).Methods(http.MethodGet)

	// organizations routes
	router.Handle("/organizations", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(listOrganizationHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getOrganizationHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{domainName}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getOrganizationByDomainNameHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createOrganizationHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(deleteOrganizationHandler(deps))),
	)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	router.Handle("/organizations/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(updateOrganizationHandler(deps))),
	)).Methods(http.MethodPut).Headers(versionHeader, v1)

	// badges routes
	router.Handle("/organizations/{organization_id:[0-9]+}/badges", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createBadgeHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(listBadgesHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(updateBadgeHandler(deps))),
	)).Methods(http.MethodPut).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(showBadgeHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(deleteBadgeHandler(deps))),
	)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	// Get S3 signed URL
	router.Handle("/s3_signed_url", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getS3SignedURLHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	// Recognition Hi5 routes

	router.Handle("/recognitions/{recognition_id:[0-9]+}/hi5", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createRecognitionHi5Handler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	// Recognitions
	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(createRecognitionHandler(deps))),
	)).Methods(http.MethodPost).Headers(versionHeader, v1)

	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions/{recognition_id:[0-9]+}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(getRecognitionHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.Handle("/organisations/{orgnization_id:[0-9]+}/recognitions", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(listRecognitionsHandler(deps))),
	)).Methods(http.MethodGet).Headers(versionHeader, v1)
	return
}
