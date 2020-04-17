package service

import (
  "io"
	"encoding/json"
  "fmt"
	"net/http"
  "strconv"
  "github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func getRoleHandler(deps Dependencies) http.HandlerFunc {
  return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
    vars := mux.Vars(req) // Get URL variables
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
      logger.WithField("err", err.Error()).Error("Error converting ID in URL to string")
      rw.WriteHeader(http.StatusInternalServerError)
      return
    }

    role, err := deps.Store.GetRole(id, req.Context())
    if err != nil {
      logger.WithField("err", err.Error()).Error(
        fmt.Sprintf("Error marshaling role id %d", id))
      rw.WriteHeader(http.StatusNotFound)
      io.WriteString(rw, `{"message":"not found"}`)
      return
    }

    respBytes, err := json.Marshal(role)
    if err != nil {
      logger.WithField("err", err.Error()).Error(
        fmt.Sprintf("Error marshaling role id %d", id))
      rw.WriteHeader(http.StatusInternalServerError)
      return
    }

    rw.Header().Add("Content-Type", "application/json")
    rw.Write(respBytes)
  })
}

// @Title listRoles
// @Description list all Roles
// @Router /roles [get]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}
func listRolesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		users, err := deps.Store.ListRoles(req.Context())
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(users)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling roles data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}
