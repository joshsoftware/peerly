package service

import (
	"fmt"
	"net/http"

	"joshsoftware/peerly/config"

	"github.com/gorilla/mux"
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

	router.HandleFunc("/users", listUsersHandler(deps)).Methods(http.MethodGet).Headers(versionHeader, v1)

	// Basic logout
	router.HandleFunc("/logout", handleLogout(deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)

	// Note on {provider} here - the auth library in use (goth) requires this variable name so it can
	// discern which provider is being used to authenticate based on the request URL.
	router.HandleFunc("/auth/{provider}/callback", handleAuthCallback(deps)).Methods(http.MethodGet)
	router.HandleFunc("/auth/{provider}", handleAuthInit(deps)).Methods(http.MethodGet)

	return
}
