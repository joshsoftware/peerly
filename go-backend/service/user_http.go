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
		vars := mux.Vars(req)
		email := vars["email"]
		user, err := deps.Store.GetUserByEmail(req.Context(), email)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		// TODO: Check if user is a blank/nil object, and if so, return a 404
		// and a JSON response body saying the user wasn't found

		repsonse(rw, http.StatusOK, successResponse{Data: user})

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
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		respBytes, err := json.Marshal(users)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling users data")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
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
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error id is missing",
				},
			})
			return
		}

		user, err := deps.Store.GetUser(req.Context(), id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching User")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}
		repsonse(rw, http.StatusOK, successResponse{Data: user})
	})
}

func updateUserHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error id is missing",
				},
			})
			return
		}

		var user db.User
		err = json.NewDecoder(req.Body).Decode(&user)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding user")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json body",
				},
			})
			return
		}

		errRes, valid := user.Validate()
		if !valid {
			respBytes, err := json.Marshal(errRes)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling user's data")
				repsonse(rw, http.StatusBadRequest, errorResponse{
					Error: messageObject{
						Message: "Invalid json body",
					},
				})
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
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			logger.WithField("err", err.Error()).Error("Error while updating user's profile")
			return
		}
		repsonse(rw, http.StatusOK, successResponse{Data: updatedUser})

		return
	})
}
