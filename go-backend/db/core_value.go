package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

type CoreValue struct {
	ID                int64  `db:"id" json:"id"`
	OrgID             int64  `db:"org_id" json:"org_id"`
	CoreValueText     string `db:"core_value_text" json:"core_value_text"`
	Description       string `db:"description" json:"description"`
	ParentCoreValueID *int64 `db:"parent_core_value_id" json:"parent_core_value_id"`
}

const (
	listCoreValuesQuery  = `SELECT * FROM core_values WHERE org_id = $1`
	getCoreValueQuery    = `SELECT * FROM core_values WHERE org_id = $1 and id = $2`
	createCoreValueQuery = `INSERT INTO core_values (org_id, core_value_text,
		description, parent_core_value_id) VALUES ($1, $2, $3, $4) RETURNING id`
	deleteSubCoreValueQuery = `DELETE FROM core_values WHERE org_id = $1 and parent_core_value_id = $2`
	deleteCoreValueQuery    = `DELETE FROM core_values WHERE org_id = $1 and id = $2`
	updateCoreValueQuery    = `UPDATE core_values SET (core_value_text, description) =
		($1, $2) where id = $3 and org_id = $4`
)

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

func (s *pgStore) CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (coreValueID string, err error) {
	err = s.db.GetContext(
		ctx,
		&coreValueID,
		createCoreValueQuery,
		organisationID,
		coreValue.CoreValueText,
		coreValue.Description,
		coreValue.ParentCoreValueID,
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
	_, err = s.db.ExecContext(
		ctx,
		updateCoreValueQuery,
		coreValue.CoreValueText,
		coreValue.Description,
		coreValueID,
		organisationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while updating core value")
		return
	}

	return
}
