package db

import (
	"context"

	logger "github.com/sirupsen/logrus"
)

const (
	getUserQuery = `SELECT id,
		org_id,
		first_name,
		last_name,
		email,
		display_name,
		profile_image,
		role_id,
		hi5_quota_balance
		FROM users WHERE id=$1 AND soft_delete = $2 `

	updateUserQuery = `UPDATE users SET (
		first_name,
		last_name,
		email,
		display_name,
		profile_image,
		role_id,
		hi5_quota_balance
		) = 
		($1, $2, $3, $4, $5, $6, $7) where id = $8 AND soft_delete = $9`
)

type User struct {
	ID              int    `db:"id" json:"id" `
	OrgID           int    `db:"org_id" json:"org_id"`
	FirstName       string `db:"first_name" json:"first_name"`
	LastName        string `db:"last_name" json:"last_name"`
	Email           string `db:"email" json:"email"`
	DisplayName     string `db:"display_name" json:"display_name"`
	ProfileImage    string `db:"profile_image" json:"profile_image"`
	SoftDelete      bool   `db:"soft_delete" json:"soft_delete,omitempty"`
	RoleID          int    `db:"role_id" json:"role_id" `
	Hi5QuotaBalance int    `db:"hi5_quota_balance" json:"hi5_quota_balance"`
	SoftDeleteBy    int    `db:"soft_delete_by" json:"soft_delete_by,omitempty" `
	SoftDeleteAt    int64  `db:"soft_delete_at" json:"soft_delete_at,omitempty" `
}

func (s *pgStore) ListUsers(ctx context.Context) (users []User, err error) {
	err = s.db.Select(&users, "SELECT * FROM users WHERE soft_delete = false  ORDER BY first_name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing users")
		return
	}

	return
}

func (s *pgStore) GetUser(ctx context.Context, userID int) (user User, err error) {
	err = s.db.Get(&user, getUserQuery, userID, false)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error fetching user")
		return
	}
	return
}

func (s *pgStore) UpdateUser(ctx context.Context, userProfile User, userID int) (updatedUser User, err error) {
	var dbUser User
	err = s.db.Get(&dbUser, getUserQuery, userID, false)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting user profile")
		return
	}
	_, err = s.db.Exec(
		updateUserQuery,
		userProfile.FirstName,
		userProfile.LastName,
		userProfile.Email,
		userProfile.DisplayName,
		userProfile.ProfileImage,
		userProfile.RoleID,
		userProfile.Hi5QuotaBalance,
		userID,
		false,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error updating user profile")
		return
	}

	err = s.db.Get(&updatedUser, getUserQuery, userID, false)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting user profile")
		return
	}
	return
}

func (usr *User) Validate() (errorResponse map[string]ErrorResponse, valid bool) {
	fieldErrors := make(map[string]string)

	if usr.FirstName == "" {
		fieldErrors["first_name"] = "Can't be blank"
	}
	if usr.LastName == "" {
		fieldErrors["last_name"] = "Can't be blank"
	}
	if usr.DisplayName == "" {
		fieldErrors["display_name"] = "Can't be blank"
	}

	if !emailRegex.MatchString(usr.Email) {
		fieldErrors["email"] = "Please enter a valid email"
	}
	if len(fieldErrors) == 0 {
		valid = true
		return
	}

	errorResponse = map[string]ErrorResponse{"error": ErrorResponse{
		Code:    "invalid_data",
		Message: "Please provide valid user's data",
		Fields:  fieldErrors,
	},
	}
	//TODO: Ask what other validations are expected

	return
}
