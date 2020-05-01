package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

// User - basic struct representing a User
type User struct {
	ID              int64     `db:"id" json:"id"`
	Name            string    `db:"name" json:"full_name"`
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

// GetUserByEmail - Given an email address, return that user.
func (s *pgStore) GetUserByEmail(ctx context.Context, email string) (user User, err error) {
	err = s.db.Select(&user, `SELECT * FROM users WHERE email=$1 LIMIT 1`, email)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user from database by email " + email)
		return
	}
	return
}

// GetUserByID - Given the database ID for that user, look them up.
func (s *pgStore) GetUserByID(ctx context.Context, id int64) (user User, err error) {
	err = s.db.Select(&user, `SELECT * FROM users WHERE id=$1 LIMIT 1`, id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user from database by id %v", id)
		return
	}
	return
}

// ListUsers - retrieves all users from the database. Could be a very large result set...
func (s *pgStore) ListUsers(ctx context.Context) (users []User, err error) {
	err = s.db.Select(&users, "SELECT * FROM users ORDER BY name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing users")
		return
	}

	return
}

// CreateNewUser - creates a new user in the database
func (s *pgStore) CreateNewUser(ctx context.Context, u User) (newUser User, err error) {
	// First, make sure they're not already in the database because if they are, we can just return that user
	newUser, err = s.GetUserByEmail(ctx, u.Email)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error checking for duplicate user in db.CreateNewUser w/ email: " + u.Email)
		return
	}

	// If we made it this far, they don't appear to be in the database yet.
	q := `INSERT INTO users (
    id, name, org_id, email, display_name, profile_image_url, soft_delete, role_id, hi5_quota_balance,
    soft_delete_by, soft_delete_on
  ) VALUES (
    DEFAULT, :name, :org_id, :email, :display_name, :profile_image_url, :soft_delete, :role_id, :hi5_quota_balance,
    :soft_delete_by, :soft_delete_on
  )`
	tx, err := s.db.Beginx() // Use Beginx instead of MustBegin so process doesn't die if there's an error
	if err != nil {
		// FAIL: Could not begin database transaction
		logger.WithField("err", err.Error()).Error("Error beginning user insert transaction in db.CreateNewUser with email " + u.Email)
	}
	_, err = tx.NamedExec(q, u)
	if err != nil {
		// FAIL: Could not run insert query
		logger.WithField("err", err.Error()).Error("Error inserting user into database: " + u.Email)
	}
	err = tx.Commit()
	if err != nil {
		// FAIL: Transaction commit failed. Will automatically roll back.
		logger.WithField("err", err.Error()).Error("Error commiting transaction inserting user into database: " + u.Email)
	}

	// If we make it this far we've successfully inserted a new user into the database.
	// Re-select them and return that new user.
	newUser = User{}
	err = s.db.Select(&newUser, `SELECT * FROM users WHERE email=$1 LIMIT 1`, u.Email)
	if err != nil {
		// FAIL: User selection failed even though they should have been inserted already?
		logger.WithField("err", err.Error()).Error("Error selecting user from database with email: " + u.Email)
	}
	return
}
