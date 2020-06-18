package service

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/suite"
	"github.com/urfave/negroni"
	"joshsoftware/peerly/config"
)

func TestExampleTestSuite(t *testing.T) {
	config.Load("application_test")
	suite.Run(t, new(UsersHandlerTestSuite))
	suite.Run(t, new(OrganizationHandlerTestSuite))
	suite.Run(t, new(RecognitionHi5HandlerTestSuite))
	suite.Run(t, new(CoreValueHandlerTestSuite))
	suite.Run(t, new(ReportedRecognitionHandlerTestSuite))
	suite.Run(t, new(RecognitionModerationHandlerTestSuite))
}

// path: is used to configure router path (eg: /users/{id})
// requestURL: current request path (eg: /users/1)
func makeHTTPCall(method, path, requestURL, body string, handlerFunc http.HandlerFunc) (recorder *httptest.ResponseRecorder) {
	// create a http request using the given parameters
	req, _ := http.NewRequest(method, requestURL, strings.NewReader(body))

	// test recorder created for capturing api responses
	recorder = httptest.NewRecorder()

	// create a router to serve the handler in test with the prepared request
	router := mux.NewRouter()
	router.HandleFunc(path, handlerFunc).Methods(method)

	// serve the request and write the response to recorder
	router.ServeHTTP(recorder, req)
	return
}

// path: is used to configure router path (eg: /users/{id})
// requestURL: current request path (eg: /users/1)
func makeHTTPCallWithJWTMiddleware(method, path, requestURL, body string, handlerFunc http.HandlerFunc) (recorder *httptest.ResponseRecorder) {
	// create jwt token with userID
	JWTToken, _ := newJWT(1)

	// create a http request using the given parameters
	req, _ := http.NewRequest(method, requestURL, strings.NewReader(body))
	req.Header.Set("Authorization", "Bearer " + JWTToken)

	// test recorder created for capturing api responses
	recorder = httptest.NewRecorder()

	// create a router to serve the handler in test with the prepared request
	router := mux.NewRouter()
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return config.JWTKey(), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
	router.Handle(path, negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(handlerFunc)),
	)).Methods(method)

	// serve the request and write the response to recorder
	router.ServeHTTP(recorder, req)
	return
}
