package service

import (
	"encoding/json"
	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"
)

// @Title listOrganizationHandler
// @Description list all Organizations
// @Router /organizations [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		organizations, err := deps.Store.ListOrganizations(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error listing organizations")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(organizations)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

// @Title createOrganizationHandler
// @Description Create Organizations
// @Router /organizations [post]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func createOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var organization db.Organization
		err := json.NewDecoder(req.Body).Decode(&organization)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding organization data")
			return
		}

		errorResponse, valid := organization.Validate()
		if !valid {
			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling organization data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}

			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		var createdOrganization db.Organization
		createdOrganization, err = deps.Store.CreateOrganization(req.Context(), organization)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error create organization")
			return
		}

		respBytes, err := json.Marshal(createdOrganization)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
	})
}

// @Title updateOrganizationHandler
// @Description Update Organizations
// @Router /organizations/:id [put]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func updateOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var organization db.Organization
		err = json.NewDecoder(req.Body).Decode(&organization)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding organization")
			return
		}

		errorResponse, valid := organization.Validate()
		if !valid {
			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}

			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		var updatedOrganization db.Organization
		updatedOrganization, err = deps.Store.UpdateOrganization(req.Context(), organization, id)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while updating organization")
			return
		}

		respBytes, err := json.Marshal(updatedOrganization)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
		return
	})
}

// @Title deleteOrganizationHandler
// @Description Delete Organizations
// @Router /organizations/:id [delete]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func deleteOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.DeleteOrganization(req.Context(), id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while deleting organization")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-Type", "application/json")
	})
}

// @Title getOrganizationHandler
// @Description get Organizations
// @Router /organizations/:id [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func getOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		organization, err := deps.Store.GetOrganization(req.Context(), id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while fetching organization")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(organization)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organization data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
