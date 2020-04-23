package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

type User struct {
	ID              int64     `db:"id" json:"id"`
	Name            string    `db:"name" json:"full_name"`
	Age             int       `db:"age" json:"age"`
	OrgID           int64     `db:"org_id" json:"org_id"`
	Email           string    `db:"email" json:"email"`
	DisplayName     string    `db:"display_name" json:"display_name"`
	ProfileImageURL string    `db:"profile_image_url" json:"profile_image_url"`
	SoftDelete      bool      `db:"soft_delete" json:"soft_delete"`
	RoleID          int64     `db:"role_id" json:"role_id"`
	Hi5QuotaBalance int       `db:"hi5_quota_balance" json:"hi5_quota_balance"`
	SoftDeleteBy    int64     `db:"soft_delete_by" json:"soft_delete_by"`
	SoftDeleteOn    time.Time `db:"soft_delete_on" json:"-"`
}

func (s *pgStore) ListUsers(ctx context.Context) (users []User, err error) {
	err = s.db.Select(&users, "SELECT * FROM users ORDER BY name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing users")
		return
	}

	return
}
