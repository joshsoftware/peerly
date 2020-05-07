package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

const (
	createBadgeQuery = `INSERT INTO badges (
		name,
		org_id,
		hi5_count_required,
		hi5_frequency)
		VALUES ($1, $2, $3, $4) RETURNING id`

	getBadgeQuery = `SELECT id,
		name,
		org_id,
		hi5_count_required,
		hi5_frequency FROM badges WHERE id = $1 and org_id = $2`

	listBadgesQuery = `SELECT id,
		name,
		org_id,
		hi5_count_required,
		hi5_frequency FROM badges where org_id = $1 ORDER BY name ASC`

	updateBadgesQuery = `UPDATE badges SET (
		name,
		hi5_count_required,
		hi5_frequency) =
		($1, $2, $3) where id = $4 and org_id = $5`

	deleteBadgeQuery = `DELETE FROM badges WHERE id = $1 and org_id = $2`
)

type Badge struct {
	ID               int    `db:"id" json:"id" `
	Name             string `db:"name" json:"name"`
	OrganizationID   int    `db:"org_id" json:"org_id"`
	Hi5CountRequired int    `db:"hi5_count_required" json:"hi5_count_required"`
	Hi5Frequency     string `db:"hi5_frequency" json:"hi5_frequency"`
}

func (bdg *Badge) Validate() (errorResponse map[string]ErrorResponse, valid bool) {
	fieldErrors := make(map[string]string)
	if bdg.Name == "" {
		fieldErrors["name"] = "Can't be blank"
	}

	if len(fieldErrors) == 0 {
		valid = true
		return
	}

	errorResponse = map[string]ErrorResponse{"error": ErrorResponse{
			Code: "invalid_data",
			Message: "Please provide valid badge data",
			Fields: fieldErrors,
		},
	}

	return
}

func (s *pgStore) CreateBadge(ctx context.Context, bdg Badge) (createdBadge Badge, err error) {
	lastInsertId := 0
	err = s.db.QueryRow(
		createBadgeQuery,
		bdg.Name,
		bdg.OrganizationID,
		bdg.Hi5CountRequired,
		bdg.Hi5Frequency,
	).Scan(&lastInsertId)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating badge")
		return
	}

	err = s.db.Get(&createdBadge, getBadgeQuery, lastInsertId, bdg.OrganizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error in getting badge")
		return
	}
	return
}


func (s *pgStore) ListBadges(ctx context.Context,org_id int) (bdgs []Badge, err error) {
	err = s.db.Select(&bdgs, listBadgesQuery,org_id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing badges")
		return
	}

	return
}


func (s *pgStore) UpdateBadge(ctx context.Context, bdg Badge) (updatedBadge Badge, err error) {
		var dbBadge Badge
		err = s.db.Get(&dbBadge, getBadgeQuery, bdg.ID,bdg.OrganizationID)

		_, err = s.db.Exec(
			updateBadgesQuery,
			bdg.Name,
			bdg.Hi5CountRequired,
			bdg.Hi5Frequency,
			bdg.ID,
			bdg.OrganizationID,
		)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating badge")
			return
		}

		err = s.db.Get(&updatedBadge, getBadgeQuery, bdg.ID,bdg.OrganizationID)

		return
}

func (s *pgStore) ShowBadge(ctx context.Context, bdg Badge) (dbBadge Badge, err error) {
		err = s.db.Get(&dbBadge, getBadgeQuery, bdg.ID,bdg.OrganizationID)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error fetching badge")
			return
		}

		return
}

func (s *pgStore) DeleteBadge(ctx context.Context, organizationID, id int) (err error) {
	_, err = s.db.Exec(
		deleteBadgeQuery,
		organizationID,
		id,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting badge")
		return
	}

	return
}
