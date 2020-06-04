package db

import (
	"context"
	"fmt"
	"time"

	logger "github.com/sirupsen/logrus"
)

// UserBlacklistedToken - struct representing a token to be blacklisted (logout)
type UserBlacklistedToken struct {
	ID             int       `db:"id" json:"id"`
	UserID         int       `db:"user_id" json:"user_id"`
	Token          string    `db:"token" json:"token"`
	ExpirationDate time.Time `db:"expiration_date" json:"expiration_date"`
}

const (
	deleteExpiredToken     = `DELETE FROM user_blacklisted_tokens WHERE expiration_date >= $1`
	insertBlacklistedToken = `INSERT INTO user_blacklisted_tokens
	(user_id, token, expiration_date)
	VALUES ($1, $2, $3)
	`
)

// CleanBlacklistedTokens - this function (to be executed in a goroutine) is responsible for
// purging old blacklisted session tokens so the database doesn't fill up with junk data
func (s *pgStore) CleanBlacklistedTokens() (err error) {
	_, err = s.db.Exec(deleteExpiredToken, time.Now().UTC())

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting blacklisted tokens in db.CleanBlacklistedTokens")
		return
	}
	return
}

func (s *pgStore) CreateUserBlacklistedToken(ctx context.Context, blacklistedToken UserBlacklistedToken) (err error) {
	_, err = s.db.Exec(insertBlacklistedToken, blacklistedToken.UserID, blacklistedToken.Token, blacklistedToken.ExpirationDate)

	if err != nil {
		errMsg := fmt.Sprintf("Error inserting the blacklisted token for user with id %d", blacklistedToken.UserID)
		logger.WithField("err", err.Error()).Error(errMsg)
		return
	}
	return
}
