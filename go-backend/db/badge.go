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
		($1, $2, $3) where (id = $4 and org_id = $5) AND id NOT IN(SELECT badge_id from user_badges)`

	deleteBadgeQuery = `DELETE FROM badges WHERE (id = $1 and org_id = $2) AND id NOT IN(SELECT badge_id from user_badges)`
)

type Badge struct {
	ID               int    `db:"id" json:"id" `
	Name             string `db:"name" json:"name"`
	OrganizationID   int    `db:"org_id" json:"org_id"`
	Hi5CountRequired int    `db:"hi5_count_required" json:"hi5_count_required"`
	Hi5Frequency     string `db:"hi5_frequency" json:"hi5_frequency"`
}

func (badge *Badge) Validate() (errorResponse map[string]ErrorResponse, valid bool) {
	fieldErrors := make(map[string]string)
	if badge.Name == "" {
		fieldErrors["name"] = "Can't be blank"
	}

	if len(fieldErrors) == 0 {
		valid = true
		return
	}

	errorResponse = map[string]ErrorResponse{"error": ErrorResponse{
		Code:    "invalid_data",
		Message: "Please provide valid badge data",
		Fields:  fieldErrors,
	},
	}

	return
}

func (s *pgStore) CreateBadge(ctx context.Context, badge Badge) (createdBadge Badge, err error) {
	lastInsertId := 0
	err = s.db.QueryRow(
		createBadgeQuery,
		badge.Name,
		badge.OrganizationID,
		badge.Hi5CountRequired,
		badge.Hi5Frequency,
	).Scan(&lastInsertId)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating badge")
		return
	}
	err = s.db.Get(&createdBadge, getBadgeQuery, lastInsertId, badge.OrganizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error in getting badge")
		return
	}
	return
}

func (s *pgStore) ListBadges(ctx context.Context, org_id int) (badges []Badge, err error) {
	err = s.db.Select(&badges, listBadgesQuery, org_id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing badges")
		return
	}

	return
}

func (s *pgStore) UpdateBadge(ctx context.Context, badge Badge) (updatedBadge Badge, err error) {
	var dbBadge Badge
	err = s.db.Get(&dbBadge, getBadgeQuery, badge.ID, badge.OrganizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting badges")
		return
	}
	_, err = s.db.Exec(
		updateBadgesQuery,
		badge.Name,
		badge.Hi5CountRequired,
		badge.Hi5Frequency,
		badge.ID,
		badge.OrganizationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while updating badge")
		return
	}

	err = s.db.Get(&updatedBadge, getBadgeQuery, badge.ID, badge.OrganizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting badges")
		return
	}

	return
}

func (s *pgStore) ShowBadge(ctx context.Context, badge Badge) (dbBadge Badge, err error) {
	err = s.db.Get(&dbBadge, getBadgeQuery, badge.ID, badge.OrganizationID)
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
		logger.WithField("err", err.Error()).Error("Error while deleting badge")
		return
	}

	return
}
