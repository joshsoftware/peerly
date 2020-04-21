package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	logger "github.com/sirupsen/logrus"
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
			logger.WithField("err", err.Error()).Error("Error fetching data")
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
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while decoding organizations data")
			return
		}

		_, err = deps.Store.CreateOrganization(req.Context(), organization)

		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error create organization")
			return
		}
		respBytes, err := json.Marshal("Organization created successfully")
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

// @Title updateOrganizationHandler
// @Description Update Organizations
// @Router /organizations [put]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}	
func updateOrganizationHandler(deps Dependencies) http.HandlerFunc{
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		keys, ok := req.URL.Query()["id"]

		if ok == false {
			logger.Error("Error missing key id in query params")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		organizationID, err := strconv.Atoi(keys[0])		
		
		var organization db.Organization
		err = json.NewDecoder(req.Body).Decode(&organization)
		
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error while decoding organizations data")
			return
		}

		_, err = deps.Store.UpdateOrganization(req.Context(), organization, organizationID)

		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error update organization")
			return
		}

		respBytes, err := json.Marshal("Organization Updated successfully")

		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
		
	})
}

// @Title deleteOrganizationHandler
// @Description Delete Organizations
// @Router /organizations [delete]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func deleteOrganizationHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		keys, ok := req.URL.Query()["id"]

		if ok == false {
			logger.Error("Error missing key id in query params")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		organizationID, err := strconv.Atoi(keys[0])

		_, err = deps.Store.DeleteOrganization(req.Context(), organizationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling organizations data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, _ := json.Marshal("Organization deleted successfully")

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
