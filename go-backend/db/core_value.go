package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	listCoreValuesQuery    = `SELECT * FROM core_values WHERE org_id = $1 and parent_core_value_id IS NULL`
	listSubCoreValuesQuery = `SELECT * FROM core_values WHERE org_id = $1 and parent_core_value_id = $2`
	getCoreValueQuery      = `SELECT * FROM core_values WHERE org_id = $1 and id = $2`
	createCoreValueQuery   = `INSERT INTO core_values (org_id, core_value_text,
		description, parent_core_value_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`
	deleteSubCoreValueQuery = `DELETE FROM core_values WHERE org_id = $1 and parent_core_value_id = $2`
	deleteCoreValueQuery    = `DELETE FROM core_values WHERE org_id = $1 and id = $2`
	updateCoreValueQuery    = `UPDATE core_values SET (core_value_text, description, updated_at) =
		($1, $2, $3) where id = $4 and org_id = $5`
)

type CoreValue struct {
	ID                int64     `db:"id" json:"id"`
	OrgID             int64     `db:"org_id" json:"org_id"`
	CoreValueText     string    `db:"core_value_text" json:"core_value_text"`
	Description       string    `db:"description" json:"description"`
	ParentCoreValueID *int64    `db:"parent_core_value_id" json:"parent_core_value_id"`
	CreatedAt         time.Time `db:"created_at" json:"-"`
	UpdatedAt         time.Time `db:"updated_at" json:"-"`
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
		logger.WithField("err", err.Error()).Error("Error while getting core values")
		return
	}

	return
}

func (s *pgStore) ListSubCoreValues(ctx context.Context, organisationID, coreValueID int64) (coreValues []CoreValue, err error) {
	coreValues = make([]CoreValue, 0)
	err = s.db.SelectContext(
		ctx,
		&coreValues,
		listSubCoreValuesQuery,
		organisationID,
		coreValueID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting sub core values")
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
		logger.WithField("err", err.Error()).Error("Error while getting core value")
		return
	}

	return
}

func (s *pgStore) CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (err error) {
	now := time.Now()
	_, err = s.db.ExecContext(
		ctx,
		createCoreValueQuery,
		organisationID,
		coreValue.CoreValueText,
		coreValue.Description,
		coreValue.ParentCoreValueID,
		now,
		now,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while creating core value")
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
		logger.WithField("err", err.Error()).Error("Error while deleting sub core value")
		return
	}

	_, err = s.db.ExecContext(
		ctx,
		deleteCoreValueQuery,
		organisationID,
		coreValueID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while deleting core value")
		return
	}

	return
}

func (s *pgStore) UpdateCoreValue(ctx context.Context, organisationID, coreValueID int64, coreValue CoreValue) (err error) {
	now := time.Now()
	_, err = s.db.ExecContext(
		ctx,
		updateCoreValueQuery,
		coreValue.CoreValueText,
		coreValue.Description,
		now,
		coreValueID,
		organisationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while updating core value")
		return
	}

	return
}
