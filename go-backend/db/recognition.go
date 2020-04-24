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
	listRecognitionQuery = "SELECT * FROM recognitions ORDER BY recognition_on ASC"
)

func listRecognitionsFilterByOneFilterQuery(column_name string) string {
	return "SELECT * FROM recognitions WHERE " + column_name + "=$1 ORDER BY recognition_on ASC"
}

func listRecognitionsFilterByTwoFilterQuery(column_name_1 string, column_name_2 string) string {
	return "SELECT * FROM recognitions WHERE " + column_name_1 + "=$1 AND " + column_name_2 + "=$2 ORDER BY recognition_on ASC"
}

func listRecognitionsFilterByThreeFilterQuery(column_name_1 string, column_name_2 string, column_name_3 string) string {
	return "SELECT * FROM recognitions WHERE " + column_name_1 + "=$1 AND " + column_name_2 + "=$2 AND " + column_name_3 + "=$3 ORDER BY recognition_on ASC"
}

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

func (s *pgStore) ShowRecognition(ctx context.Context, recognitionID int) (recognition Recognition, err error) {
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

func (s *pgStore) ListRecognitionsWithFilter(ctx context.Context, filters map[string]int) (recognitions []Recognition, err error) {
	keys := make([]string, len(filters))
	values := make([]int, len(filters))
	i := 0
	for key, val := range filters {
		keys[i] = key
		values[i] = val
		i++
	}
	switch len(filters) {
	case 1:
		err = s.db.Select(
			&recognitions,
			listRecognitionsFilterByOneFilterQuery(keys[0]),
			values[0],
		)
	case 2:
		err = s.db.Select(
			&recognitions,
			listRecognitionsFilterByTwoFilterQuery(keys[0], keys[1]),
			values[0],
			values[1],
		)
	case 3:
		err = s.db.Select(
			&recognitions,
			listRecognitionsFilterByThreeFilterQuery(keys[0], keys[1], keys[2]),
			values[0],
			values[1],
			values[2],
		)
	}
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing recognitions")
		return
	}
	return
}
