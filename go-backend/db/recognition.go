package db

import (
	"context"
	"fmt"
	"strconv"
	"strings"

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
		VALUES ($1, $2, $3, $4, $5) returning id
	`
	showRecognitionQuery = "SELECT * FROM recognitions WHERE id=$1"
	listRecognitionQuery = "SELECT * FROM recognitions ORDER BY given_at ASC"
)

// func listRecognitionsFilterByOneFilterQuery(column_name string) string {
// 	return "SELECT * FROM recognitions WHERE " + column_name + "=$1 ORDER BY given_at ASC"
// }

// func listRecognitionsFilterByTwoFilterQuery(column_name_1 string, column_name_2 string) string {
// 	return "SELECT * FROM recognitions WHERE " + column_name_1 + "=$1 AND " + column_name_2 + "=$2 ORDER BY given_at ASC"
// }

// func listRecognitionsFilterByThreeFilterQuery(column_name_1 string, column_name_2 string, column_name_3 string) string {
// 	return "SELECT * FROM recognitions WHERE " + column_name_1 + "=$1 AND " + column_name_2 + "=$2 AND " + column_name_3 + "=$3 ORDER BY given_at ASC"
// }

type Recognition struct {
	ID          int    `db:"id" json:"id"`
	CoreValueID int    `db:"core_value_id" json:"core_value_id"`
	Text        string `db:"text" json:"text"`
	GivenFor    int    `db:"given_for" json:"given_for"`
	GivenBy     int    `db:"given_by" json:"given_by"`
	GivenAt     int64  `db:"given_at" json:"given_at"`
}

func (recognition Recognition) ValidateRecognition() (valid bool, errFields map[string]string) {
	errFields = make(map[string]string)

	if recognition.CoreValueID == 0 {
		errFields["core_value_id"] = "core_value_id must be present in request"
	}

	if recognition.Text == "" {
		errFields["text"] = "text must be present in request"
	}

	if recognition.GivenFor == 0 {
		errFields["given_for"] = "given_for must be present in request"
	}

	if recognition.GivenBy == 0 {
		errFields["given_by"] = "given_by must be present in request"
	}
	if len(errFields) == 0 {
		valid = true
	}
	return
}

func (s *pgStore) CreateRecognition(ctx context.Context, recognition Recognition) (createdRecognition Recognition, err error) {

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
	_, err = tx.ExecContext(ctx,
		createRecognitionQuery,
		recognition.CoreValueID,
		recognition.Text,
		recognition.GivenFor,
		recognition.GivenBy,
		recognition.GivenAt,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating Recognition")
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
	var filterValues, coloumnVals []interface{}
	var filteredCols []string
	for k, v := range filters {
		filterValues = append(filterValues, v)
		coloumnVals = append(coloumnVals, v)
		filteredCols = append(filteredCols, fmt.Sprintf(`"%s" = %s`, k, "$"+strconv.Itoa(len(filterValues))))
	}
	err = s.db.Select(&recognitions, "SELECT * FROM recognitions WHERE "+strings.Join(filteredCols, " AND "), coloumnVals...)
	if err != nil {
		logger.WithField("err:", err.Error()).Error("Error listing recognitions")
		return
	}
	return
}
