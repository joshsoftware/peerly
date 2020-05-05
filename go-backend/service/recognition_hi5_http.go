package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"
	logger "github.com/sirupsen/logrus"
)

func createRecognitionHi5Handler(deps Dependencies)(http.HandlerFunc){
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request){
		var recognitionHi5 db.RecognitionHi5

		err := json.NewDecoder(req.Body).Decode(&recognitionHi5)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error Decoding recognitionHi5 data")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		err = deps.Store.CreateRecognitionHi5(req.Context(), recognitionHi5)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error in creating recogntion hi5")
			rw.WriteHeader(http.StatusBadRequest)
			return
		}

		respBytes, err := json.Marshal("Hi5 to you too!")
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error marshaling response")
			rw.WriteHeader(http.StatusInternalServerError)
			return
		}
		
		rw.WriteHeader(http.StatusOK)
		rw.Write(respBytes)
		return
	})
}