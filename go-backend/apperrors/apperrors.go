/*
========================================================================
Error Definitions
	This file, part of the "apperrors" package, defines all the error
	variables by name that'll be used throughout the entire application.

Rules
	Every error variable MUST start with "Err" - with a capital E so
	we can export it for use in other packages.

	Additionally, please place a comment (one or more lines) on the line
	before the declaration of the error variable that explains what that
	variable is intended to be used for, or the error concept it's meant
	to represent.

Notes
	There are also additional helper functions in this file pertaining to
	miscellaneous error handling.
========================================================================
*/

package apperrors

import (
	"encoding/json"
	"errors"
	"fmt"
	"joshsoftware/peerly/util/log"
	"net/http"
)

// ErrorStruct - a generic struct you can use to create error messages/logs to be converted
// to JSON or other types of messages/data as you need it
type ErrorStruct struct {
	Message string `json:"message,omitempty"` // Your message to the end user or developer
	Status  int    `json:"status,omitempty"`  // HTTP status code that should go with the message/log (if any)
}

// JSONError - This function writes out an error response with the status
// header passed in
func JSONError(rw http.ResponseWriter, status int, err error) {
	// Create the ErrorStruct object for later use
	errObj := ErrorStruct{
		Message: err.Error(),
		Status:  status,
	}

	errJSON, err := json.Marshal(&errObj)
	if err != nil {
		log.Warn(err, "Error in AppErrors marshalling JSON", err)
	}
	rw.WriteHeader(status)
	rw.Header().Add("Content-Type", "application/json")
	rw.Write(errJSON)
	return
}

// ErrKeyNotSet - Returns error object specific to the key value passed in
func ErrKeyNotSet(key string) (err error) {
	return fmt.Errorf("Key not set: %s", key)
}

// ErrInvalidConfig - used when the user's configuration doesn't have everything
// it needs to launch the app (e.g. missing JWT_KEY)
var ErrInvalidConfig = errors.New("Problem with application.yml config file (see .example version)")

// ErrRecordNotFound - for when a database record isn't found
var ErrRecordNotFound = errors.New("Database record not found")

// ErrInvalidToken - used when a JSON Web Token ("JWT") cannot be validated
// by the JWT library
var ErrInvalidToken = errors.New("Invalid Token")

// ErrNoAuthCode - The URL-encoded variable 'code' is missing from the request URL
var ErrNoAuthCode = errors.New("'code' URL parameter missing")

// ErrMissingAuthHeader - When the HTTP request doesn't contain an 'Authorization' header
var ErrMissingAuthHeader = errors.New("Missing Auth header")

// ErrAuthCodeRequestFail - When the OAuth provider doesn't issue a token to us
// (used when we ask for user information during the authentication process)
var ErrAuthCodeRequestFail = errors.New("Request for OAuth 2.0 authorization token failed")

// ErrJSONParseFail - for some reason, the call to json.Unmarshal or json.Marshal returned an error
var ErrJSONParseFail = errors.New("Failed to parse JSON response (likely not valid JSON)")

// ErrReadingResponseBody - If for some reason the app can't read the HTTP response body
// issued by another server (used when we try to read user information via oauth during
// login process)
var ErrReadingResponseBody = errors.New("Could not read HTTP response body")

// ErrHTTPRequestFailed - The HTTP request we issued failed for some reason
var ErrHTTPRequestFailed = errors.New("HTTP Request Failed")

// ErrNoSigningKey - there isn't a signing key defined in the app configuration
var ErrNoSigningKey = errors.New("no JWT signing key specified; cannot authenticate users. Define JWT_SECRET in application.yml and restart")

// ErrNoUserDomain - the user returned by the oauth provider has no domain name associated with them
var ErrNoUserDomain = errors.New("the user returned by the oauth provider has no domain name associated with them")

// ErrDomainNotRegistered - Used when a domain name doesn't exist in our database
func ErrDomainNotRegistered(email string) (err error) {
	return fmt.Errorf("No such domain for user %v", email)
}

// ErrFailedToCreate - Failed to create record in database
var ErrFailedToCreate = errors.New("Failed to create database record")

// -----
// Let's make the more "generic" errors dead last in our file
// -----

// ErrUnknown - Used when an unknown/unexpected error has ocurred. Try to avoid over-using this.
var ErrUnknown = errors.New("unknown/unexpected error has occurred")
