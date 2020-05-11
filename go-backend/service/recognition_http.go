package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gorilla/schema"
	logger "github.com/sirupsen/logrus"
)

type FilterParam struct {
	RecognitionFor int `schema:"recognition_for"`
	RecognitionBy  int `schema:"recognition_by"`
	CoreValuesID   int `schema:"core_values_id"`
}

func (f FilterParam) isEmpty() bool {
	return f.RecognitionBy == 0 && f.RecognitionFor == 0 && f.CoreValuesID == 0
}

func (f FilterParam) applicableFilters() (res map[string]int) {
	res = make(map[string]int)
	if f.RecognitionFor != 0 {
		res["recognition_for"] = f.RecognitionFor
	}
	if f.RecognitionBy != 0 {
		res["recognition_by"] = f.RecognitionBy
	}
	if f.CoreValuesID != 0 {
		res["core_values_id"] = f.CoreValuesID
	}
	return
}

var decoder = schema.NewDecoder()

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

		recognitionID, err := strconv.Atoi(vars["recognition_id"])
		if err != nil {
			logger.Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

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

// @Title listRecognitionsHandler
// @Description get recognitions
// @Router /organisations/{id:[0-9]+}/recognitions
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listRecognitionsHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var filterParam FilterParam
		err := decoder.Decode(&filterParam, req.URL.Query())
		var recognitions []db.Recognition

		if filterParam.isEmpty() {
			recognitions, err = deps.Store.ListRecognitions(req.Context())
		} else {
			filters := filterParam.applicableFilters()
			recognitions, err = deps.Store.ListRecognitionsWithFilter(req.Context(), filters)
		}

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
