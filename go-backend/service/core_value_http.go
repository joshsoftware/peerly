package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
	"joshsoftware/peerly/db"
)

func listCoreValuesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValues, err := deps.Store.ListCoreValues(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, map[string]messageObject{
				"error": messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, map[string][]db.CoreValue{"data": coreValues})
	})
}

func getCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValue, err := deps.Store.GetCoreValue(req.Context(), organisationID, coreValueID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching data")
			repsonse(rw, http.StatusInternalServerError, map[string]messageObject{
				"error": messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, map[string]db.CoreValue{"data": coreValue})
	})
}

func createCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var coreValue db.CoreValue
		err = json.NewDecoder(req.Body).Decode(&coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			repsonse(rw, http.StatusBadRequest, map[string]messageObject{
				"error": messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, organisationID)
		if !ok {
			repsonse(rw, http.StatusBadRequest, map[string]errorObject{
				"error": errorObject{
					Fields:  errFields,
					messageObject: messageObject{"Invalid core value data"},
				},
			})
			return
		}

		resp, err := deps.Store.CreateCoreValue(req.Context(), organisationID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating core value")
			repsonse(rw, http.StatusInternalServerError, map[string]messageObject{
				"error": messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusCreated, map[string]db.CoreValue{"data": resp})
	})
}

func deleteCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.DeleteCoreValue(req.Context(), organisationID, coreValueID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while deleting core value")
			repsonse(rw, http.StatusInternalServerError, map[string]messageObject{
				"error": messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, nil)
	})
}

func updateCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var coreValue db.CoreValue
		err = json.NewDecoder(req.Body).Decode(&coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			repsonse(rw, http.StatusBadRequest, map[string]messageObject{
				"error": messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, organisationID)
		if !ok {
			repsonse(rw, http.StatusBadRequest, map[string]errorObject{
				"error": errorObject{
					Fields:  errFields,
					messageObject: messageObject{"Invalid core value data"},
				},
			})
			return
		}

		resp, err := deps.Store.UpdateCoreValue(req.Context(), organisationID, coreValueID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while updating core value")
			repsonse(rw, http.StatusInternalServerError, map[string]messageObject{
				"error": messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, map[string]db.CoreValue{"data": resp})
	})
}
