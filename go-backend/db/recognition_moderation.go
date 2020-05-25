package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	createRecognitionModerationQuery = `INSERT INTO recognition_moderation (recognition_id, is_inappropriate,
		moderator_comment, moderated_by, moderated_at, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id, recognition_id, is_inappropriate, moderator_comment, moderated_by, moderated_at, created_at, updated_at`
)

type RecognitionModeration struct {
	ID               int64     `db:"id" json:"id"`
	RecognitionID    int64     `db:"recognition_id" json:"recognition_id"`
	IsInappropriate  *bool     `db:"is_inappropriate" json:"is_inappropriate"`
	ModeratorComment string    `db:"moderator_comment" json:"comment"`
	ModeratedBy      int64     `db:"moderated_by" json:"moderated_by"`
	ModeratedAt      int64     `db:"moderated_at" json:"moderated_at"`
	CreatedAt        time.Time `db:"created_at" json:"-"`
	UpdatedAt        time.Time `db:"updated_at" json:"-"`
}

func (recognitionModeration *RecognitionModeration) Validate() (valid bool, errFields map[string]string) {
	errFields = make(map[string]string)

	if recognitionModeration.IsInappropriate == nil {
		errFields["is_inappropriate"] = "Can't be blank"
	}

	if len(errFields) == 0 {
		valid = true
	}
	return
}

func (s *pgStore) CreateRecognitionModeration(ctx context.Context, recognitionID int64, recognitionModeration RecognitionModeration) (resp RecognitionModeration, err error) {
	now := time.Now()
	err = s.db.GetContext(
		ctx,
		&resp,
		createRecognitionModerationQuery,
		recognitionID,
		recognitionModeration.IsInappropriate,
		recognitionModeration.ModeratorComment,
		recognitionModeration.ModeratedBy,
		now.Unix(),
		now,
		now,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":                           err.Error(),
			"recognitionID":                 recognitionID,
			"recognition_moderation_params": recognitionModeration,
		}).Error("Error while creating recognition moderation")
		return
	}

	return
}
