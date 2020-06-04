package db

import (
	"context"
	"database/sql"
	ae "joshsoftware/peerly/apperrors"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	getUserByEmailQuery = `SELECT * FROM users WHERE email=$1 LIMIT 1`
	getUserByIDQuery    = `SELECT * FROM users WHERE id=$1 LIMIT 1`
	listUsersQuery      = `SELECT * FROM users ORDER BY name ASC`
	insertUserQuery     = `INSERT INTO users (
		id, name, org_id, email, display_name, profile_image_url, soft_delete, role_id, hi5_quota_balance,
		soft_delete_by, soft_delete_on, created_at
	) VALUES (
		DEFAULT, :name, :org_id, :email, :display_name, :profile_image_url, FALSE, :role_id, :hi5_quota_balance,
		0, NULL, :created_at
	)`
)

// User - basic struct representing a User
type User struct {
	ID              int           `db:"id" json:"id"`
	Name            string        `db:"name" json:"full_name"`
	OrgID           int           `db:"org_id" json:"org_id"`
	Email           string        `db:"email" json:"email"`
	DisplayName     string        `db:"display_name" json:"display_name"`
	ProfileImageURL string        `db:"profile_image_url" json:"profile_image_url"`
	SoftDelete      bool          `db:"soft_delete" json:"soft_delete"`
	RoleID          int           `db:"role_id" json:"role_id"`
	Hi5QuotaBalance int           `db:"hi5_quota_balance" json:"hi5_quota_balance"`
	SoftDeleteBy    sql.NullInt64 `db:"soft_delete_by" json:"soft_delete_by"`
	SoftDeleteOn    sql.NullTime  `db:"soft_delete_on" json:"soft_delete_on"`
	CreatedAt       time.Time     `db:"created_at" json:"created_at"`
}

// Organization - retrieve the user's organization based on the OrgID property
func (u *User) Organization(ctx context.Context, store Storer) (org Organization, err error) {
	org, err = store.GetOrganization(ctx, u.OrgID)
	return
}

// Role - retrieve the user's role based on the RoleID property
func (u *User) Role(ctx context.Context, store Storer) (role Role, err error) {
	role, err = store.GetRoleByID(ctx, u.RoleID)
	return
}

// GetUserByEmail - Given an email address, return that user.
func (s *pgStore) GetUserByEmail(ctx context.Context, email string) (user User, err error) {
	err = s.db.Get(&user, getUserByEmailQuery, email)
	if err != nil {
		if err == sql.ErrNoRows {
			err = ae.ErrRecordNotFound
		}
		// Possible that there's no rows in the result set
		logger.WithField("err", err.Error()).Error("Error selecting user from database by email " + email)
		return
	}

	// Populate the user's organization data
	org := Organization{}
	err = s.db.Get(&org, getOrganizationByIDQuery, user.OrgID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user's organization from database by email and id " + email + " " + string(user.OrgID))
		return
	}
	return
}

// GetUserByID - Given the database ID for that user, look them up.
func (s *pgStore) GetUserByID(ctx context.Context, id int) (user User, err error) {
	err = s.db.Get(&user, getUserByIDQuery, id)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user from database by id " + string(id))
		return
	}
	// Populate the user's organization data
	org := Organization{}
	err = s.db.Get(&org, getOrganizationByIDQuery, user.OrgID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user's organization from database by user id and org id " + string(id) + " " + string(user.OrgID))
		return
	}
	return
}

// ListUsers - retrieves all users from the database. Could be a very large result set...
func (s *pgStore) ListUsers(ctx context.Context) (users []User, err error) {
	err = s.db.Select(&users, listUsersQuery)
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
	if err == nil {
		// If there's already a user here err will be nil, so newUser is populated. Just return, don't
		// bother with all the rest of this function. No need to log an error that doesn't exist, either.
		return
	}

	// Set the created_at time property on u so that it doesn't default to some weird value over 2000 years ago
	u.CreatedAt = time.Now().UTC()

	// Set the user's role; we're going to start by looking up the role for "Employee" (automatically created by
	// database migrations so we know it's there), then assign the user's RoleID to that role's ID.
	r, _ := s.GetRoleByName(ctx, "Employee") // TODO: What should we do here if there's no "Employee" role?
	u.RoleID = r.ID

	tx, err := s.db.Beginx() // Use Beginx instead of MustBegin so process doesn't die if there's an error
	if err != nil {
		// FAIL: Could not begin database transaction
		logger.WithField("err", err.Error()).Error("Error beginning user insert transaction in db.CreateNewUser with email " + u.Email)
		return
	}
	_, err = tx.NamedExec(insertUserQuery, u)
	if err != nil {
		// FAIL: Could not run insert query
		logger.WithField("err", err.Error()).Error("Error inserting user into database: " + u.Email)
		return
	}
	err = tx.Commit()
	if err != nil {
		// FAIL: Transaction commit failed. Will automatically roll back.
		logger.WithField("err", err.Error()).Error("Error commiting transaction inserting user into database: " + u.Email)
		return
	}

	// If we make it this far we've successfully inserted a new user into the database.
	// Re-select them and return that new user.
	newUser, err = s.GetUserByEmail(ctx, u.Email)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error selecting user from database with email: " + u.Email)
		return
	}
	return
}
