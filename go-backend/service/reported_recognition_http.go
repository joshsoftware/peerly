package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/db"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func createReportedRecognitionHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		parsedToken, ok := req.Context().Value("user").(*jwt.Token)
		if !ok {
			logger.Error("Error parsing JSON for token response")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		claims := parsedToken.Claims.(jwt.MapClaims)
		userID, err := strconv.Atoi(claims["sub"].(string))
		if err != nil {
			logger.Error(ae.ErrJSONParseFail, "Error parsing JSON for token response", err)
			ae.JSONError(rw, http.StatusInternalServerError, err)
			return
		}

		vars := mux.Vars(req)
		recognitionID, err := strconv.ParseInt(vars["recognition_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing recognition_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var reportedRecognition db.ReportedRecognition
		err = json.NewDecoder(req.Body).Decode(&reportedRecognition)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}
		reportedRecognition.ReportedBy = int64(userID)

		ok, errFields := reportedRecognition.Validate()
		if !ok {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: errorObject{
					Code:          "invalid-reported-recognition",
					Fields:        errFields,
					messageObject: messageObject{"Invalid reported recognition data"},
				},
			})
			return
		}

		resp, err := deps.Store.CreateReportedRecognition(req.Context(), recognitionID, reportedRecognition)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating reported recognition")
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
