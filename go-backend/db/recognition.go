package db

import (
	"context"
	"errors"

	logger "github.com/sirupsen/logrus"
)

const (
	createRecognitionQuery = `
		INSERT INTO recognitions (
			core_value_id,
			text,
			given_for,
			given_by,
			given_at
		)
		VALUES ($1, $2, $3, $4, $5)
	`
	showRecognitionQuery = "SELECT * FROM recognitions WHERE id=$1"
	listRecognitionQuery = "SELECT * FROM recognitions ORDER BY given_at ASC"
)

type Recognition struct {
	ID          int    `db:"id" json:"id"`
	CoreValueID int    `db:"core_value_id" json:"core_value_id"`
	Text        string `db:"text" json:"text"`
	GivenFor    int    `db:"given_for" json:"given_for"`
	GivenBy     int    `db:"given_by" json:"given_by"`
	GivenAt     int64  `db:"given_at" json:"given_at"`
}

func (recognition Recognition) ValidateRecognition() (err error) {
	if recognition.CoreValueID == 0 {
		return errors.New("core_value_id must be present in request")
	}

	if recognition.Text == "" {
		return errors.New("text must be present in request")
	}

	if recognition.GivenFor == 0 {
		return errors.New("given_for must be present in request")
	}

	if recognition.GivenBy == 0 {
		return errors.New("given_by must be present in request")
	}
	return
}

func (s *pgStore) CreateRecognition(ctx context.Context, recognition Recognition) (err error) {
	_, err = s.db.Exec(
		createRecognitionQuery,
		recognition.CoreValueID,
		recognition.Text,
		recognition.GivenFor,
		recognition.GivenBy,
		recognition.GivenAt,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating recognition")
		return
	}
	return
}

func (s *pgStore) ShowRecognition(ctx context.Context, recognitionID string) (recognition Recognition, err error) {
	err = s.db.Get(
		&recognition,
		showRecognitionQuery,
		recognitionID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing recognitions")
		return
	}
	return
}
func (s *pgStore) ListRecognitions(ctx context.Context) (recognitions []Recognition, err error) {
	err = s.db.Select(&recognitions, listRecognitionQuery)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing recognitions")
		return
	}
	return
}
