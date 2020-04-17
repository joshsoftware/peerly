package db

import(
  "context"
  "fmt"
	_ "joshsoftware/peerly/config"
  _ "github.com/jmoiron/sqlx"
  _ "github.com/lib/pq"
  logger "github.com/sirupsen/logrus"
)

type Role struct {
  Id int        `db:"id" json:"id"`
  Role string   `db:"role", json:"role"`
}

func (s *pgStore) ListRoles(ctx context.Context) (roles []Role, err error) {
  err = s.db.Select(&roles, "SELECT * FROM roles ORDER BY role ASC")
  if err != nil {
    logger.WithField("err", err.Error()).Error("Error listing roles")
    return
  }
  return
}

func (s *pgStore) GetRole(id int, ctx context.Context) (role Role, err error) {
  err = s.db.Get(&role, "SELECT * FROM roles WHERE id=$1", id)
  if err != nil {
    logger.WithField("err", err.Error()).Error(
      fmt.Sprintf("Error retrieving role with ID: %d", id))
    return
  }

  return
}

