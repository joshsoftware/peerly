package service

import (
	"net/http"

	"github.com/gorilla/mux"
	logger "github.com/sirupsen/logrus"
)

func getS3SignedURLHandler() http.HandlerFunc {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)
		S3SignedURLData, err := getS3SignedURL(req.Context(), vars["type"])
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error while retrieving URL")
			rw.WriteHeader(http.StatusInternalServerError)
			repsonse(rw, http.StatusInternalServerError, errorResponse{
				Error: messageObject{
					Message: "Error while retrieving URL using" + vars["type"],
				},
			})
		}
		repsonse(rw, http.StatusOK, successResponse{Data: S3SignedURLData})
	})
}
