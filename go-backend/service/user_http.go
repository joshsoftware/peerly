package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

// @Title getUserByEmail
// @Description Returns a user from the database based on the email address in the URL ("/users/{email}")
// @Router /users/{email} [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func getUserByEmailHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		tmp, ok := req.URL.Query()["email"]
		if !ok || len(tmp[0]) < 1 {
			rw.WriteHeader(http.StatusBadRequest)
			// log.Error(errNoAuthCode, "No 'email' URL parameter provided", req.URL.String())
			return
		}
		email := tmp[0]
		user, err := deps.Store.GetUserByEmail(req.Context(), email)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			// TODO: Log error message, send to http client as json
			return
		}

		// TODO: Check if user is a blank/nil object, and if so, return a 404
		// and a JSON response body saying the user wasn't found

		respBytes, err := json.Marshal(user)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			// TODO: Log error marshalling json and create json response to send to http client
			return
		}
		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
		return
	})
}

// @Title listUsers
// @Description list all User
// @Router /users [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listUsersHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		users, err := deps.Store.ListUsers(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(users)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
		return
	})
}

func getUserHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		user, err := deps.Store.GetUser(req.Context(), id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching User")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(user)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling User's data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func updateUserHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var user db.User
		err = json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding user")
			return
		}

		errorResponse, valid := user.Validate()
		if !valid {
			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling user's data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		var updatedUser db.User
		updatedUser, err = deps.Store.UpdateUser(req.Context(), user, id)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while updating user's profile")
			return
		}

		respBytes, err := json.Marshal(updatedUser)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling user's data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
		return
	})
}
