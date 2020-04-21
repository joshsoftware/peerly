package db

import (
	"context"
	"fmt"
	"time"

	logger "github.com/sirupsen/logrus"
)

type Recognition struct {
	ID              int       `db:"id" json:"id"`
	CoreValuesID    int       `db:"core_values_id" json:"core_values_id"`
	RecognitionText string    `db:"recognition_text" json:"recognition_text"`
	RecognitionFor  int       `db:"recognition_for" json:"recognition_for"`
	RecognitionBy   int       `db:"recognition_by" json:"recognition_by"`
	RecognitionOn   time.Time `db:"recognition_on" json:"recognition_on"`
}

func (s *pgStore) CreateRecognition(ctx context.Context, recognition Recognition) (err error) {
	createRecognitionQuery := `
		INSERT INTO recognitions (
			core_values_id,
			recognition_text,
			recognition_for,
			recognition_by,
			recognition_on
		)
		VALUES ($1, $2, $3, $4, $5)
	`
	_, err = s.db.Exec(
		createRecognitionQuery,
		recognition.CoreValuesID,
		recognition.RecognitionText,
		recognition.RecognitionFor,
		recognition.RecognitionBy,
		time.Now(),
	)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating recognition")
		return
	}

	return
}

func (s *pgStore) ShowRecognition(ctx context.Context, recognition_id string) (recognition Recognition, err error) {
	showRecognitionQuery := "SELECT * FROM recognitions WHERE id=$1"
	fmt.Println(recognition_id)
	err = s.db.Get(
		&recognition,
		showRecognitionQuery,
		recognition_id,
	)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing recognitions")
		return
	}

	return
}
