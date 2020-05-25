package service

import (
	"fmt"
	"net/http"

	"joshsoftware/peerly/config"

	"github.com/gorilla/mux"
)

const (
	versionHeader = "Accept"
)

/* The routing mechanism. Mux helps us define handler functions and the access methods */
func InitRouter(deps Dependencies) (router *mux.Router) {
	router = mux.NewRouter()

	// No version requirement for /ping
	router.HandleFunc("/ping", pingHandler).Methods(http.MethodGet)
	// Version 1 API management
	v1 := fmt.Sprintf("application/vnd.%s.v1", config.AppName())

	//core values
	router.HandleFunc("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", getCoreValueHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)
	router.HandleFunc("/organisations/{organisation_id:[0-9]+}/core_values", listCoreValuesHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)
	router.HandleFunc("/organisations/{organisation_id:[0-9]+}/core_values", createCoreValueHandler(deps)).Methods(http.MethodPost).Headers(versionHeader, v1)
	router.HandleFunc("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", deleteCoreValueHandler(deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)
	router.HandleFunc("/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}", updateCoreValueHandler(deps)).Methods(http.MethodPut).Headers(versionHeader, v1)

	//reported recognition
	router.HandleFunc("/recognitions/{recognition_id:[0-9]+}/report", createReportedRecognitionHandler(deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//recognition moderation
	router.HandleFunc("/recognitions/{recognition_id:[0-9]+}/review", createRecognitionModerationHandler(deps)).Methods(http.MethodPost).Headers(versionHeader, v1)

	//users
	router.HandleFunc("/users", listUsersHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	router.HandleFunc("/organizations", listOrganizationHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)
	router.HandleFunc("/organizations/{id:[0-9]+}", getOrganizationHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)
	router.HandleFunc("/organizations", createOrganizationHandler(deps)).Methods(http.MethodPost).Headers(versionHeader, v1)
	router.HandleFunc("/organizations/{id:[0-9]+}", deleteOrganizationHandler(deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)
	router.HandleFunc("/organizations/{id:[0-9]+}", updateOrganizationHandler(deps)).Methods(http.MethodPut).Headers(versionHeader, v1)
	return
}
