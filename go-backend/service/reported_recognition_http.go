package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
	"joshsoftware/peerly/db"
)

func createReportedRecognitionHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		userID := int64(1) //Extract for token

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
		reportedRecognition.ReportedBy = &userID

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
