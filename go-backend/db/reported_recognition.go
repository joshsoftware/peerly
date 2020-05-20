package db

import (
	"context"
	"strings"
	"time"

	logger "github.com/sirupsen/logrus"
)

var REPORTED_RECOGNITION_TYPE = []string{"fraud", "not_relevant", "incorrect"}

const (
	createReportedRecognitionQuery = `INSERT INTO reported_recognitions (recognition_id, type_of_reporting,
		reason_for_reporting, reported_by, reported_at) VALUES ($1, $2, $3, $4, $5)
		RETURNING id, recognition_id, type_of_reporting, reason_for_reporting, reported_by, reported_at`
)

type ReportedRecognition struct {
	ID                 int64     `db:"id" json:"id"`
	RecognitionID      *int64    `db:"recognition_id" json:"recognition_id"`
	TypeOfReporting    string    `db:"type_of_reporting" json:"mark_as"`
	ReasonForReporting string    `db:"reason_for_reporting" json:"reason"`
	ReportedBy         *int64    `db:"reported_by" json:"reported_by"`
	ReportedAt         int64     `db:"reported_at" json:"reported_at"`
	CreatedAt          time.Time `db:"created_at" json:"-"`
	UpdatedAt          time.Time `db:"updated_at" json:"-"`
}

func include(slice []string, val string) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}

func (reportedRecognition *ReportedRecognition) Validate() (valid bool, errFields map[string]string) {
	errFields = make(map[string]string)

	if reportedRecognition.TypeOfReporting == "" {
		errFields["mark_as"] = "Can't be blank"
	} else {
		reportedRecognition.TypeOfReporting = strings.ToLower(reportedRecognition.TypeOfReporting)
		ok := include(REPORTED_RECOGNITION_TYPE, reportedRecognition.TypeOfReporting)
		if !ok {
			errFields["mark_as"] = "Invalid reported recognition type"
		}
	}

	if reportedRecognition.ReasonForReporting == "" {
		errFields["reason"] = "Can't be blank"
	}

	if len(errFields) == 0 {
		valid = true
	}
	return
}

func (s *pgStore) CreateReportedRecognition(ctx context.Context, recognitionID int64, reportedRecognition ReportedRecognition) (resp ReportedRecognition, err error) {
	now := time.Now()
	err = s.db.GetContext(
		ctx,
		&resp,
		createReportedRecognitionQuery,
		recognitionID,
		reportedRecognition.TypeOfReporting,
		reportedRecognition.ReasonForReporting,
		reportedRecognition.ReportedBy,
		now.Unix(),
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":                         err.Error(),
			"recognitionID":               recognitionID,
			"reported_recognition_params": reportedRecognition,
		}).Error("Error while creating reported recognition")
		return
	}

	return
}
