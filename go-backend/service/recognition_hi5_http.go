package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func createRecognitionHi5Handler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		recognitionID, err := strconv.Atoi(vars["recognition_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error recognition_id key is missing")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error recognition_id key is missing",
				},
			})
			return
		}

		var recognitionHi5 db.RecognitionHi5
		err = json.NewDecoder(req.Body).Decode(&recognitionHi5)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error Decoding recognitionHi5 data")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error Decoding recognitionHi5 data",
				},
			})
			return
		}

		currentUser, err := deps.Store.GetUser(req.Context(), recognitionHi5.GivenBy)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching User")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while fetching User",
				},
			})
			return
		}

		errorResp := recognitionHi5.CheckHi5QuotaBalance(currentUser.Hi5QuotaBalance)
		if len(errorResp) > 0 {
			logger.Error("Insufficient hi5 quota balance for ", currentUser.ID)

			_, err := json.Marshal(errorResp)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling recognitionHi5 data")
				repsonse(rw, http.StatusBadRequest, errorResponse{
					Error: messageObject{
						Message: "Error marshaling recognitionHi5 data",
					},
				})
				return
			}

			return
		}

		err = deps.Store.CreateRecognitionHi5(req.Context(), recognitionHi5, recognitionID)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error in creating recognition hi5")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error marshaling recognitionHi5 data",
				},
			})
			return
		}

		rw.WriteHeader(http.StatusCreated)
		return
	})
}
