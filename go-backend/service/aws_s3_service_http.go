package service

import (
	"net/http"

	logger "github.com/sirupsen/logrus"
)

func getS3SignedURLHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		// vars := mux.Vars(req)
		S3SignedURLData, err := deps.Store.GetAWSS3SignedURL(req.Context(), req.FormValue("type"), req.FormValue("filename"))
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while retrieving URL")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while retrieving URL using" + req.FormValue("type") + " and " + req.FormValue("filename"),
				},
			})
		}
		repsonse(rw, http.StatusOK, successResponse{Data: S3SignedURLData})
	})
}
