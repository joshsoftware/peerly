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

	selectHi5QuotaQuery = `SELECT hi5_quota_balance FROM users WHERE id = $1;`
)

type RecognitionHi5 struct {
	Id int  `db:"id" json:"id"`
	RecognitionId int `db:"recognition_id" json:"recognition_id"`
	Comment string  `db:"comment" json:"comment"`
	GivenBy int `db:"given_by" json:"given_by"`
	GivenAt int64 `db:"given_at" json:"given_at"`
}

func (s *pgStore) CheckHi5QuotaBalance(reqHi5 RecognitionHi5)(errorResponse map[string]ErrorResponse, valid bool){
	var hi5QuotaBalance int
	err := s.db.Get(&hi5QuotaBalance, selectHi5QuotaQuery, reqHi5.GivenBy)
	if err != nil {
		logger.WithField("err",err.Error()).Error("Error querying Hi5 quota balance")
		return
	}

	if hi5QuotaBalance <= 0 {
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