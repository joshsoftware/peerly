package service

import (
	"encoding/json"
	"fmt"
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
			logger.Error("Error missing key organisation_id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		coreValues, err := deps.Store.ListCoreValues(req.Context(), organisationID)
		fmt.Println(coreValues)

		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(coreValues)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling core values data")
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
			logger.Error("Error missing key organisation_id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.Error("Error missing key id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		coreValue, err := deps.Store.GetCoreValue(req.Context(), organisationID, coreValueID)
		fmt.Println(coreValue)

		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling core values data")
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
			logger.Error("Error missing key organisation_id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		var coreValue db.CoreValue
		err = json.NewDecoder(req.Body).Decode(&coreValue)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			return
		}

		coreValueID, err := deps.Store.CreateCoreValue(req.Context(), organisationID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error creating core value")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(fmt.Sprintf("Core Value Created successfully with ID: %s", coreValueID))
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling string")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func deleteCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.Error("Error missing key organisation_id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.Error("Error missing key id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		err = deps.Store.DeleteCoreValue(req.Context(), organisationID, coreValueID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error deleting core value")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal("Core value deleted successfully")
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling string")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func updateCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		if err != nil {
			logger.Error("Error missing key organisation_id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.Error("Error missing key id in url")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		var coreValue db.CoreValue
		err = json.NewDecoder(req.Body).Decode(&coreValue)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			return
		}

		err = deps.Store.UpdateCoreValue(req.Context(), organisationID, coreValueID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating core value")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal("Core value Updated successfully")

		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling core value data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
