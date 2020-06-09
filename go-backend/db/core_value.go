package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	listCoreValuesQuery  = `SELECT id, org_id, text, description, parent_id  FROM core_values WHERE org_id = $1`
	getCoreValueQuery    = `SELECT id, org_id, text, description, parent_id FROM core_values WHERE org_id = $1 and id = $2`
	createCoreValueQuery = `INSERT INTO core_values (org_id, text,
		description, parent_id, thumbnail_url, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, org_id, text, description, parent_id, thumbnail_url`
	deleteSubCoreValueQuery = `DELETE FROM core_values WHERE org_id = $1 and parent_id = $2`
	deleteCoreValueQuery    = `DELETE FROM core_values WHERE org_id = $1 and id = $2`
	updateCoreValueQuery    = `UPDATE core_values SET (text, description, updated_at) =
		($1, $2, $3) where id = $4 and org_id = $5 RETURNING id, org_id, text, description, parent_id`
)

// CoreValue - struct representing a core value object
type CoreValue struct {
	ID           int64     `db:"id" json:"id"`
	OrgID        int64     `db:"org_id" json:"org_id"`
	Text         string    `db:"text" json:"text"`
	Description  string    `db:"description" json:"description"`
	ParentID     *int64    `db:"parent_id" json:"parent_id"`
	ThumbnailURL *string   `db:"thumbnail_url" json:"thumbnail_url"`
	CreatedAt    time.Time `db:"created_at" json:"-"`
	UpdatedAt    time.Time `db:"updated_at" json:"-"`
}

func validateParentCoreValue(ctx context.Context, storer Storer, organisationID, coreValueID int64) (ok bool) {
	coreValue, err := storer.GetCoreValue(ctx, organisationID, coreValueID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Parent core value id not present")
		return
	}

	if coreValue.ParentID != nil {
		logger.Error("Invalid parent core value id")
		return
	}

	return true
}

// Validate - ensures the core value object has all the info it needs
func (coreValue CoreValue) Validate(ctx context.Context, storer Storer, organisationID int64) (valid bool, errFields map[string]string) {
	errFields = make(map[string]string)

	if coreValue.Text == "" {
		errFields["text"] = "Can't be blank"
	}
	if coreValue.Description == "" {
		errFields["description"] = "Can't be blank"
	}
	if coreValue.ParentID != nil {
		if !validateParentCoreValue(ctx, storer, organisationID, *coreValue.ParentID) {
			errFields["parent_id"] = "Invalid parent core value"
		}
	}

	if len(errFields) == 0 {
		valid = true
	}
	return
}

func (s *pgStore) ListCoreValues(ctx context.Context, organisationID int64) (coreValues []CoreValue, err error) {
	coreValues = make([]CoreValue, 0)
	err = s.db.SelectContext(
		ctx,
		&coreValues,
		listCoreValuesQuery,
		organisationID,
	)

	if err != nil {
		logger.WithFields(logger.Fields{
			"err":    err.Error(),
			"org_id": organisationID,
		}).Error("Error while getting core values")
		return
	}

	return
}

func (s *pgStore) GetCoreValue(ctx context.Context, organisationID, coreValueID int64) (coreValue CoreValue, err error) {
	err = s.db.GetContext(
		ctx,
		&coreValue,
		getCoreValueQuery,
		organisationID,
		coreValueID,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":           err.Error(),
			"org_id":        organisationID,
			"core_value_id": coreValueID,
		}).Error("Error while getting core value")
		return
	}

	return
}

func (s *pgStore) CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (resp CoreValue, err error) {
	now := time.Now()
	err = s.db.GetContext(
		ctx,
		&resp,
		createCoreValueQuery,
		organisationID,
		coreValue.Text,
		coreValue.Description,
		coreValue.ParentID,
		coreValue.ThumbnailURL,
		now,
		now,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":               err.Error(),
			"org_id":            organisationID,
			"core_value_params": coreValue,
		}).Error("Error while creating core value")
		return
	}

	return
}

func (s *pgStore) DeleteCoreValue(ctx context.Context, organisationID, coreValueID int64) (err error) {
	_, err = s.db.ExecContext(
		ctx,
		deleteSubCoreValueQuery,
		organisationID,
		coreValueID,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":           err.Error(),
			"org_id":        organisationID,
			"core_value_id": coreValueID,
		}).Error("Error while deleting sub core value")
		return
	}

	_, err = s.db.ExecContext(
		ctx,
		deleteCoreValueQuery,
		organisationID,
		coreValueID,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":           err.Error(),
			"org_id":        organisationID,
			"core_value_id": coreValueID,
		}).Error("Error while deleting core value")
		return
	}

	return
}

func (s *pgStore) UpdateCoreValue(ctx context.Context, organisationID, coreValueID int64, coreValue CoreValue) (resp CoreValue, err error) {
	now := time.Now()
	err = s.db.GetContext(
		ctx,
		&resp,
		updateCoreValueQuery,
		coreValue.Text,
		coreValue.Description,
		now,
		coreValueID,
		organisationID,
	)
	if err != nil {
		logger.WithFields(logger.Fields{
			"err":               err.Error(),
			"org_id":            organisationID,
			"core_value_id":     coreValueID,
			"core_value_params": coreValue,
		}).Error("Error while updating core value")
		return
	}

	return
}
