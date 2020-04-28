package service


import (
	"encoding/json"
	"net/http"

	logger "github.com/sirupsen/logrus"
)

type errorObject struct {
	Message string            `json:"message"`
	Fields  map[string]string `json:"fields"`
}

type errorResponse struct {
	Error interface{} `json:"error"`
}

type successResponse struct {
	Data interface{} `json:"data"`
}

func repsonse(rw http.ResponseWriter, status int, responseBody interface{}) {
	respBytes, err := json.Marshal(responseBody)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while marshaling core values data")
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(status)
	rw.Write(respBytes)
}