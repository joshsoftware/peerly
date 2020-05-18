package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

// @Title createBadgeHandler
// @Description Create Badges
// @Router /organizations/:organization_id/badges [post]
// @Accept  json
// @Success 200 {object}
// @Failure 400 {object}

func createBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}
		var badge db.Badge
		err = json.NewDecoder(req.Body).Decode(&badge)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding badge data")
			return
		}

		errorResponse, valid := badge.Validate()
		if !valid {
			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling badge data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}

			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		var createdBadge db.Badge
		badge.OrganizationID = org_id
		createdBadge, err = deps.Store.CreateBadge(req.Context(), badge)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error create badge")
			return
		}

		respBytes, err := json.Marshal(createdBadge)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling badge data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
	})
}

func listBadgesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write([]byte("Error org_id key is missing"))
			return
		}

		badges, err := deps.Store.ListBadges(req.Context(), org_id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error listing badges")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		respBytes, err := json.Marshal(badges)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling badges data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.Header().Add("Content-Type", "application/json")
		rw.Write(respBytes)
	})
}

func updateBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var badge db.Badge
		err = json.NewDecoder(req.Body).Decode(&badge)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			logger.WithField("err", err.Error()).Error("Error while decoding badge data")
			return
		}

		errorResponse, valid := badge.Validate()
		if !valid {
			respBytes, err := json.Marshal(errorResponse)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling badge data")
				rw.WriteHeader(http.StatusInternalServerError)
				return
			}

			rw.Header().Add("Content-Type", "application/json")
			rw.WriteHeader(http.StatusBadRequest)
			rw.Write(respBytes)
			return
		}

		var updatedBadge db.Badge

		badge.OrganizationID = org_id
		badge.ID = badge_id
		updatedBadge, err = deps.Store.UpdateBadge(req.Context(), badge)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error update badge")
			return
		}

		respBytes, err := json.Marshal(updatedBadge)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling badge data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
	})
}

func showBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		var latestbadge db.Badge

		latestbadge.OrganizationID = org_id
		latestbadge.ID = badge_id
		latestbadge, err = deps.Store.ShowBadge(req.Context(), latestbadge)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			logger.WithField("err", err.Error()).Error("Error show badge")
			return
		}

		respBytes, err := json.Marshal(latestbadge)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling badge data")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusCreated)
		rw.Write(respBytes)
		rw.Header().Add("Content-Type", "application/json")
	})
}

func deleteBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.DeleteBadge(req.Context(), org_id, badge_id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while deleting badge")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-Type", "application/json")
	})
}
