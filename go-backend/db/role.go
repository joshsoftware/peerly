package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

type Role struct {
	Role string `db:"role" json:"role"`
}

func (s *pgStore) ListRoles(ctx context.Context) (roles []Role, err error) {
	err = s.db.Select(&roles, "SELECT * FROM roles ORDER BY role ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing roles")
		return
	}

	return
}

func (s *pgStore) CreateRole(ctx context.Context, roleInput Role) (err error) {
	_, err = s.db.NamedExec(`INSERT INTO roles (role) VALUES (:role)`, &roleInput)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing roles")
		return
	}
	return
}
