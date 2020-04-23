package db

import (
	"context"
	"errors"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	createRecognitionQuery = `
		INSERT INTO recognitions (
			core_values_id,
			recognition_text,
			recognition_for,
			recognition_by
		)
		VALUES ($1, $2, $3, $4)
	`
	showRecognitionQuery = "SELECT * FROM recognitions WHERE id=$1"
)

type Recognition struct {
	ID              int       `db:"id" json:"id"`
	CoreValuesID    int       `db:"core_values_id" json:"core_values_id"`
	RecognitionText string    `db:"recognition_text" json:"recognition_text"`
	RecognitionFor  int       `db:"recognition_for" json:"recognition_for"`
	RecognitionBy   int       `db:"recognition_by" json:"recognition_by"`
	RecognitionOn   time.Time `db:"recognition_on" json:"recognition_on"`
}

func (recognition Recognition) ValidateRecognition() (err error) {
	if recognition.CoreValuesID == 0 {
		return errors.New("core_values_id must be present in request")
	}

	if recognition.RecognitionText == "" {
		return errors.New("core_values_id must be present in request")
	}

	if recognition.RecognitionFor == 0 {
		return errors.New("core_values_id must be present in request")
	}

	if recognition.RecognitionBy == 0 {
		return errors.New("core_values_id must be present in request")
	}
	return
}

func (s *pgStore) CreateRecognition(ctx context.Context, recognition Recognition) (err error) {
	_, err = s.db.Exec(
		createRecognitionQuery,
		recognition.CoreValuesID,
		recognition.RecognitionText,
		recognition.RecognitionFor,
		recognition.RecognitionBy,
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

	err = s.db.Select(&recognitions, "SELECT * FROM recognitions ORDER BY recognition_on ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing recognitions")
		return
	}

	return
}
