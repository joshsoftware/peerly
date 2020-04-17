package db

import(
  "context"
	_ "joshsoftware/peerly/config"
  _ "github.com/jmoiron/sqlx"
  _ "github.com/lib/pq"
  logger "github.com/sirupsen/logrus"
)

type Role struct {
  Id int
  Role string
}

func (s *pgStore) ListRoles(ctx context.Context) (roles []Role, err error) {
  err = s.db.Select(&roles, "SELECT * FROM roles ORDER BY role ASC")
  if err != nil {
    logger.WithField("err", err.Error()).Error("Error listing roles")
  }
  return
}

// func (s *pgStore) GetRole()

