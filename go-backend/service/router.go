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
	router.HandleFunc("/logout", handleLogout(deps)).Methods(http.MethodDelete).Headers(versionHeader, v1)
	router.HandleFunc("/auth/google/callback", handleAuthCallback(deps)).Methods(http.MethodGet) // Not specifying headers here because I'm not yet sure what Google will pass for the callback
	return
}
