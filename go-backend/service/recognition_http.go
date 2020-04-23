package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

// @Title createRecognitionHandler
// @Description create recognition
// @Router /organisations/{id:[0-9]+}/recognitions
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func createRecognitionHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var recognition db.Recognition
		err := json.NewDecoder(req.Body).Decode(&recognition)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding recognition data")
			return
		}

		err = recognition.ValidateRecognition()
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while creating recognition")
			return
		}

		err = deps.Store.CreateRecognition(req.Context(), recognition)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while creating recognition")
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusCreated)
	})
}

// @Title getRecognitionHandler
// @Description get recognition
// @Router /organisations/{id:[0-9]+}/recognitions/{id:[0-9]+}
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func getRecognitionHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		recognitionID := vars["recognition_id"]

		recognition, err := deps.Store.ShowRecognition(req.Context(), recognitionID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching recognition")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		respBytes, err := json.Marshal(recognition)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling recognition data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
