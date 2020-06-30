package service

import (
	"encoding/json"
	"net/http"
	"strconv"

	ae "joshsoftware/peerly/apperrors"
	"joshsoftware/peerly/db"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func listCoreValuesHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		// vars := mux.Vars(req)
		// organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		// if err != nil {
		// 	logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
		// 	rw.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

		coreValues, err := deps.Store.ListCoreValues(req.Context(), int64(validatedUser.OrgID))
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
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		vars := mux.Vars(req)
		// organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		// if err != nil {
		// 	logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
		// 	rw.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		coreValue, err := deps.Store.GetCoreValue(req.Context(), int64(validatedUser.OrgID), coreValueID)
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
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		// vars := mux.Vars(req)
		// organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		// if err != nil {
		// 	logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
		// 	rw.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

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

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, int64(validatedUser.OrgID))
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

		resp, err := deps.Store.CreateCoreValue(req.Context(), int64(validatedUser.OrgID), coreValue)
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
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		vars := mux.Vars(req)
		// organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		// if err != nil {
		// 	logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
		// 	rw.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

		coreValueID, err := strconv.ParseInt(vars["id"], 10, 64)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while parsing core value id from url")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.DeleteCoreValue(req.Context(), int64(validatedUser.OrgID), coreValueID)
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
		validatedUser, err := validateJWTToken(req.Context(), deps.Store)
		if err == ae.ErrInvalidToken {
			logger.WithField("err", err.Error()).Error("Invalid user organization with organization domain")
			repsonse(rw, http.StatusUnauthorized, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while validating the jwt token")
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{Message: err.Error()},
			})
			return
		}
		vars := mux.Vars(req)
		// organisationID, err := strconv.ParseInt(vars["organisation_id"], 10, 64)
		// if err != nil {
		// 	logger.WithField("err", err.Error()).Error("Error while parsing organisation_id from url")
		// 	rw.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

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

		ok, errFields := coreValue.Validate(req.Context(), deps.Store, int64(validatedUser.OrgID))
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

		resp, err := deps.Store.UpdateCoreValue(req.Context(), int64(validatedUser.OrgID), coreValueID, coreValue)
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
