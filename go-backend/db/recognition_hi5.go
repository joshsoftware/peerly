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

	updateHi5QuotaQuery = `UPDATE users SET hi5_quota_balance = hi5_quota_balance - 1 where id = $1;`
)

type RecognitionHi5 struct {
	ID            int    `db:"id" json:"id"`
	RecognitionID int    `db:"recognition_id" json:"recognition_id"`
	Comment       string `db:"comment" json:"comment"`
	GivenBy       int    `db:"given_by" json:"given_by"`
	GivenAt       int64  `db:"given_at" json:"given_at"`
}

func (reqHi5 *RecognitionHi5) CheckHi5QuotaBalance(hi5Quota int) (errorResponse map[string]ErrorResponse) {
	if hi5Quota <= 0 {
		errorResponse = map[string]ErrorResponse{
			"error": ErrorResponse{
				Code:    "insufficient_hi5_quota_balance",
				Message: "Insufficient Hi5 quota balance.",
			},
		}
	}
	return
}

func (s *pgStore) CreateRecognitionHi5(ctx context.Context, reqHi5 RecognitionHi5, recognitionID int) (err error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		logger.WithField("err:", err.Error()).Error("Error while initiating transaction")
		return
	}

	defer func() {
		if err != nil {
			tx.Rollback()
			return
		}
		tx.Commit()
	}()

	_, err = tx.ExecContext(ctx, updateHi5QuotaQuery, reqHi5.GivenBy)
	if err != nil {
		logger.WithField("err:", err.Error()).Error("Error updating users hi5QuotaBalance")
		return
	}

	_, err = tx.ExecContext(ctx,
		createRecognitionHi5Query,
		recognitionID,
		reqHi5.Comment,
		reqHi5.GivenBy,
		time.Now().Unix(),
	)
	if err != nil {
		logger.WithField("err:", err.Error()).Error("Error creating recognition Hi5")
		return
	}

	return
}
