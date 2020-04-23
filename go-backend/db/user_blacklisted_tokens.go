package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

type UserBlacklistedToken struct {
	ID             int64     `db:"id" json:"id"`
	UserID         int64     `db:"user_id" json:"user_id"`
	Token          string    `db:"token" json:"token"`
	ExpirationDate time.Time `db:"expiration_date" json:"expiration_date"`
}

var deleteExpiredToken = "DELETE FROM user_blacklisted_tokens WHERE expiration_date >= $1"

const insertBlacklistedToken = `INSERT INTO user_blacklisted_tokens
	(user_id, token, expiration_date)
	VALUES ($1, $2, $3)
	`

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
		logger.WithField("err", err.Error()).Error("Error inserting the blacklisted token")
		return
	}
	return
}
