package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

// Role - the main struct for a Role object, represents a single role row in the database
type Role struct {
	ID   int    `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

// GetRoleByID - given an ID, retrieve the role object
func (s *pgStore) GetRoleByID(ctx context.Context, id int) (role Role, err error) {
	err = s.db.Get(&role, `SELECT * FROM roles WHERE id=$1 LIMIT 1`, id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting role from database in GetRoleByID for id ", string(id))
	}
	return
}

func (s *pgStore) GetRoleByName(ctx context.Context, name string) (role Role, err error) {
	err = s.db.Get(&role, `SELECT * FROM roles WHERE name=$1 LIMIT 1`, name)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting role from database in GetRoleByName for name ", name)
	}
	return
}

/*// GetUserByID - Given the database ID for that user, look them up.
func (s *pgStore) GetUserByID(ctx context.Context, id int) (user User, err error) {
	err = s.db.Get(&user, `SELECT * FROM users WHERE id=$1 LIMIT 1`, id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user from database by id " + string(id))
		return
	}
	// Populate the user's organization data
	org := Organization{}
	err = s.db.Get(&org, `SELECT * FROM organizations WHERE id=$1`, user.OrgID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user's organization from database by user id and org id " + string(id) + " " + string(user.OrgID))
	}
	return
}
*/
