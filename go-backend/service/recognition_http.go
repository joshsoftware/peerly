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
		// acccept recognition
		var recognition db.Recognition
		err := json.NewDecoder(req.Body).Decode(&recognition)

		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while decoding recognition data")
			return
		}

		err = deps.Store.CreateRecognition(req.Context(), recognition)

		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while creating recognition")
			return
		}

		respBytes, err := json.Marshal("Recognition created successfully")
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.WriteHeader(http.StatusCreated)
		rw.Write(respBytes)
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
			rw.WriteHeader(http.StatusInternalServerError)
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

// @Title listRecognitionsHandler
// @Description get recognitions
// @Router /organisations/{id:[0-9]+}/recognitions
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listRecognitionsHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {

		// userId := req.URL.Query().Get("user_id")
		// coreValueId := req.URL.Query().Get("core_value_id")

		recognitions, err := deps.Store.ListRecognitions(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching recognitions")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(recognitions)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling recognition data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
