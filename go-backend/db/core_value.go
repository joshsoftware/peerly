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

func (s *pgStore) ListCoreValues(ctx context.Context, organisationID int64) (coreValues []CoreValue, err error) {
	listCoreValuesQuery := `SELECT * FROM core_values WHERE org_id = $1`
	err = s.db.SelectContext(
		ctx,
		&coreValues,
		listCoreValuesQuery,
		organisationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing core values")
		return
	}

	return
}

func (s *pgStore) GetCoreValue(ctx context.Context, organisationID, coreValueID int64) (coreValue CoreValue, err error) {
	getCoreValueQuery := `SELECT * FROM core_values WHERE org_id = $1 and id = $2`
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
	createCoreValueQuery := `INSERT INTO core_values (org_id, core_value_text, description, parent_core_value_id)
        VALUES($1, $2, $3, $4) RETURNING id`

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
		logger.WithField("err", err.Error()).Error("Error while getting core value")
		return
	}

	return
}

func (s *pgStore) DeleteCoreValue(ctx context.Context, organizationID, coreValueID int64) (err error) {
	deleteCoreValueQuery := `DELETE FROM core_values WHERE org_id = $1 and id = $2`
	result, err := s.db.Exec(
		deleteCoreValueQuery,
		organizationID,
		coreValueID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting core value")
		return
	}

	return
}
