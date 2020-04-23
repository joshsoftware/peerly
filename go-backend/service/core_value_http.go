package service

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
	"joshsoftware/peerly/db"
)

func validateParentCoreValue(ctx context.Context, deps Dependencies, organisationID, coreValueID int64) (ok bool) {
	coreValue, err := deps.Store.GetCoreValue(ctx, organisationID, coreValueID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Parent core value id not present")
		return
	}

	if coreValue.ParentCoreValueID != nil {
		logger.Error("Invalid parent core value id")
		return
	}

	return true
}

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
			return
		}

		respBytes, err := json.Marshal(coreValues)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while marshaling core values data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func listSubCoreValuesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		coreValueID, err := strconv.ParseInt(vars["core_value_id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		if !validateParentCoreValue(req.Context(), deps, organisationID, coreValueID) {
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValues, err := deps.Store.ListSubCoreValues(req.Context(), organisationID, coreValueID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(coreValues)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while marshaling core values data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
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
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while marshaling core values data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
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
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		if coreValue.ParentCoreValueID != nil {
			if !validateParentCoreValue(req.Context(), deps, organisationID, *coreValue.ParentCoreValueID) {
				rw.WriteHeader(http.StatusBadRequest)
				return
			}
		}

		err = deps.Store.CreateCoreValue(req.Context(), organisationID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating core value")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		rw.Header().Add("Content-Type", "application/json")
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
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
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
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.UpdateCoreValue(req.Context(), organisationID, coreValueID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while updating core value")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
	})
}
