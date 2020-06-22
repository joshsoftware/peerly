package service

import (
	"net/http"

	logger "github.com/sirupsen/logrus"
)

func getS3SignedURLHandler(deps Dependencies) http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		if req.FormValue("type") == "" || req.FormValue("filename") == "" {
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while retrieving bucket type and filename in URL",
				},
			})
			return
		}
		S3SignedURLData, err := deps.AWSStore.GetAWSS3SignedURL(req.Context(), req.FormValue("type"), req.FormValue("filename"))
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while retrieving URL")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while retrieving URL",
				},
			})
		}
		repsonse(rw, http.StatusOK, successResponse{Data: S3SignedURLData})
	})
}
