package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/db"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func createRecognitionModerationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		ctx := req.Context()
		validatedUser, err := validateJWTToken(ctx, deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}

		vars := mux.Vars(req)
		recognitionID, err := strconv.ParseInt(vars["recognition_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing recognition_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var recognitionModeration db.RecognitionModeration
		err = json.NewDecoder(req.Body).Decode(&recognitionModeration)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}
		recognitionModeration.ModeratedBy = int64(validatedUser.ID)

		ok, errFields := recognitionModeration.Validate()
		if !ok {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: errorObject{
					Code:          "invalid-recognition-moderation",
					Fields:        errFields,
					messageObject: messageObject{"Invalid recognition moderation data"},
				},
			})
			return
		}

		resp, err := deps.Store.CreateRecognitionModeration(req.Context(), recognitionID, recognitionModeration)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating recognition moderation")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusCreated, successResponse{Data: resp})
	})
}
