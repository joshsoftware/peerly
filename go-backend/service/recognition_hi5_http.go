package service

import (
	"encoding/json"
	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func createRecognitionHi5Handler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
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
		recognitionID, err := strconv.Atoi(vars["recognition_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error recognition_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var recognitionHi5 db.RecognitionHi5
		err = json.NewDecoder(req.Body).Decode(&recognitionHi5)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error Decoding recognitionHi5 data")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		errorResponse := recognitionHi5.CheckHi5QuotaBalance(validatedUser.Hi5QuotaBalance)
		if len(errorResponse) > 0 {
			logger.Error("Insufficient hi5 quota balance for ", validatedUser.ID)

			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling recognitionHi5 data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		err = deps.Store.CreateRecognitionHi5(req.Context(), recognitionHi5, recognitionID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error in creating recognition hi5")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		return
	})
}
