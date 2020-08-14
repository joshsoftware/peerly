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
	GivenFor    int `schema:"given_for"`
	GivenBy     int `schema:"given_by"`
	CoreValueID int `schema:"core_value_id"`
}

func (f FilterParam) isEmpty() bool {
	return f.GivenBy == 0 && f.GivenFor == 0 && f.CoreValueID == 0
}

func (f FilterParam) applicableFilters() (res map[string]int) {
	res = make(map[string]int)
	if f.GivenFor != 0 {
		res["given_for"] = f.GivenFor
	}
	if f.GivenBy != 0 {
		res["given_by"] = f.GivenBy
	}
	if f.CoreValueID != 0 {
		res["core_value_id"] = f.CoreValueID
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
		vars := mux.Vars(req)
		var recognition db.Recognition

		// validate given organization_id is correct and present or not
		organizationID, err := strconv.Atoi(vars["orgnization_id"])
		if err != nil {
			logger.Error("Error organization_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		// validate that given organization_id is present in database or not

		_, err = deps.Store.GetOrganization(req.Context(), organizationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching given organization")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching given organization",
				},
			})
			return
		}

		err = json.NewDecoder(req.Body).Decode(&recognition)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding recognition data")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		// validates that recognition giving user is belongs to current specified organization or not
		_, err = deps.Store.GetUserByOrganization(req.Context(), recognition.GivenBy, organizationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("User is not belongs to given organization")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while validating user with given organization",
				},
			})
			return
		}
		_, err = deps.Store.GetUserByOrganization(req.Context(), recognition.GivenFor, organizationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("User is not belongs to given organization")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while validating user with given organization",
				},
			})
			return
		}

		ok, errFields := recognition.ValidateRecognition()
		if !ok {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: errorObject{
					Code:          "invalid-recogintion",
					Fields:        errFields,
					messageObject: messageObject{"Invalid recogintion data"},
				},
			})
			return
		}

		_, err = deps.Store.CreateRecognition(req.Context(), recognition)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating recognition")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal serverdddd error",
				},
			})
			return
		}
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

		recognitionID, err := strconv.Atoi(vars["id"])
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

		repsonse(rw, http.StatusOK, successResponse{Data: recognition})

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

		repsonse(rw, http.StatusOK, successResponse{Data: recognitions})

	})
}
