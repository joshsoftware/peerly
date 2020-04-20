package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"

	logger "github.com/sirupsen/logrus"
)

// @Title listRoles
// @Description list all Role
// @Router /roles [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listRolesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		roles, err := deps.Store.ListRoles(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(roles)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling roles data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func createRoleHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)

		var role db.Role
		err := decoder.Decode(&role)

		err = deps.Store.CreateRole(req.Context(), role)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while creating role")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(role)

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
