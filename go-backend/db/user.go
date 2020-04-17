package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

type User struct {
	Name string `db:"name" json:"full_name"`
	Age  int    `db:"age" json:"age"`
}

func (s *pgStore) ListUsers(ctx context.Context) (users []User, err error) {
	err = s.db.Select(&users, "SELECT * FROM users ORDER BY name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing users")
		return
	}

	return
}
