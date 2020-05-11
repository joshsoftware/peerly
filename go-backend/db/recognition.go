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
