package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	"joshsoftware/peerly/db"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func listCoreValuesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.Atoi(vars["organisation_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		org, err := deps.Store.GetOrganization(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization with given id")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching organization with given id",
				},
			})
			return
		}

		coreValues, err := deps.Store.ListCoreValues(req.Context(), org.ID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, successResponse{Data: coreValues})
	})
}

func getCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.Atoi(vars["organisation_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		_, err = deps.Store.GetOrganization(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization with given id")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching organization with given id",
				},
			})
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
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, successResponse{Data: coreValue})
	})
}

func createCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.Atoi(vars["organisation_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while parsing organisation_id from url",
				},
			})
			return
		}
		_, err = deps.Store.GetOrganization(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization with given id")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching organization with given id",
				},
			})
			return
		}

		var coreValue db.CoreValue
		err = json.NewDecoder(req.Body).Decode(&coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while decoding request data")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, organisationID)
		if !ok {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: errorObject{
					Code:          "invalid-core-value",
					Fields:        errFields,
					messageObject: messageObject{"Invalid core value data"},
				},
			})
			return
		}

		resp, err := deps.Store.CreateCoreValue(req.Context(), organisationID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating core value")
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

func deleteCoreValueHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		organisationID, err := strconv.Atoi(vars["organisation_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		_, err = deps.Store.GetOrganization(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization with given id")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching organization with given id",
				},
			})
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
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
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
		organisationID, err := strconv.Atoi(vars["organisation_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		_, err = deps.Store.GetOrganization(req.Context(), organisationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization with given id")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Error while fetching organization with given id",
				},
			})
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
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, organisationID)
		if !ok {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: errorObject{
					Code:          "invalid-core-value",
					Fields:        errFields,
					messageObject: messageObject{"Invalid core value data"},
				},
			})
			return
		}

		resp, err := deps.Store.UpdateCoreValue(req.Context(), organisationID, coreValueID, coreValue)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while updating core value")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		repsonse(rw, http.StatusOK, successResponse{Data: resp})
	})
}
