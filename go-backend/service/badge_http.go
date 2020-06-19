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
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}
		var badge db.Badge
		err = json.NewDecoder(req.Body).Decode(&badge)
		if err != nil {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			logger.WithField("err", err.Error()).Error("Error while decoding badge data")
			return
		}

		errorResp, valid := badge.Validate()
		if !valid {
			_, err := json.Marshal(errorResp)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling badge data")
				repsonse(rw, http.StatusInternalServerError, errorResponse{
					Error: messageObject{
						Message: "Internal server error",
					},
				})
				return
			}
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		var createdBadge db.Badge
		badge.OrganizationID = org_id
		createdBadge, err = deps.Store.CreateBadge(req.Context(), badge)
		if err != nil {
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			logger.WithField("err", err.Error()).Error("Error create badge")
			return
		}
		repsonse(rw, http.StatusOK, successResponse{Data: createdBadge})

	})
}

func listBadgesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			rw.Write([]byte("Error org_id key is missing"))
			return
		}

		badges, err := deps.Store.ListBadges(req.Context(), org_id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error listing badges")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}
		repsonse(rw, http.StatusOK, successResponse{Data: badges})

	})
}

func updateBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		var badge db.Badge
		err = json.NewDecoder(req.Body).Decode(&badge)
		if err != nil {
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			logger.WithField("err", err.Error()).Error("Error while decoding badge data")
			return
		}

		errResp, valid := badge.Validate()
		if !valid {
			_, err := json.Marshal(errResp)
			if err != nil {
				logger.WithField("err", err.Error()).Error("Error marshaling badge data")
				repsonse(rw, http.StatusInternalServerError, errorResponse{
					Error: messageObject{
						Message: "Internal server error",
					},
				})
				return
			}

			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		var updatedBadge db.Badge

		badge.OrganizationID = org_id
		badge.ID = badge_id
		updatedBadge, err = deps.Store.UpdateBadge(req.Context(), badge)
		if err != nil {
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			logger.WithField("err", err.Error()).Error("Error update badge")
			return
		}
		repsonse(rw, http.StatusOK, successResponse{Data: updatedBadge})

	})
}

func showBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		var latestbadge db.Badge

		latestbadge.OrganizationID = org_id
		latestbadge.ID = badge_id
		latestbadge, err = deps.Store.ShowBadge(req.Context(), latestbadge)
		if err != nil {
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			logger.WithField("err", err.Error()).Error("Error show badge")
			return
		}

		repsonse(rw, http.StatusOK, successResponse{Data: latestbadge})

	})
}

func deleteBadgeHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		org_id, err := strconv.Atoi(vars["organization_id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error org_id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		badge_id, err := strconv.Atoi(vars["id"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error id key is missing")
			repsonse(rw, http.StatusBadRequest, errorResponse{
				Error: messageObject{
					Message: "Invalid json request body",
				},
			})
			return
		}

		err = deps.Store.DeleteBadge(req.Context(), org_id, badge_id)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while deleting badge")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Internal server error",
				},
			})
			return
		}

		rw.WriteHeader(http.StatusOK)
		rw.Header().Add("Content-Type", "application/json")
	})
}
