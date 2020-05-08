package db

import (
	"context"
	logger "github.com/sirupsen/logrus"
	"time"
)

const (
	createRecognitionHi5Query = `INSERT INTO recognition_hi5 (
		recognition_id,
		comment,
		given_by,
		given_at
		) VALUES ($1, $2, $3, $4);`
)

type RecognitionHi5 struct {
	Id int  `db:"id" json:"id"`
	RecognitionId int `db:"recognition_id" json:"recognition_id"`
	Comment string  `db:"comment" json:"comment"`
	GivenBy int `db:"given_by" json:"given_by"`
	GivenAt int64 `db:"given_at" json:"given_at"`
}

func (reqHi5 *RecognitionHi5) CheckHi5QuotaBalance(hi5Quota int)(errorResponse map[string]ErrorResponse, valid bool){
	if hi5Quota <= 0 {
		logger.Error("Not enough Hi5 quota balance")
		errorResponse = map[string]ErrorResponse {
			"error": ErrorResponse {
				Code: "insufficient_hi5_quota_balance",
				Message: "Insufficient Hi5 quota balance.",
			},
		}
		valid = false
		return
	}
	valid = true
	return
}

func (s *pgStore) CreateRecognitionHi5(ctx context.Context, reqHi5 RecognitionHi5, recognitionId int)(err error){
	_, err = s.db.Exec(
		createRecognitionHi5Query,
		recognitionId,
		reqHi5.Comment,
		reqHi5.GivenBy,
		time.Now().Unix(),
	)
	if err != nil {
		logger.WithField("err",err.Error()).Error("Error creating recognition Hi5")
		return
	}
  return
}