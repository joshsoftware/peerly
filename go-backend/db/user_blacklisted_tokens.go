package db

import (
	"time"

	logger "github.com/sirupsen/logrus"
)

var deleteExpiredToken = "DELETE FROM user_blacklisted_tokens WHERE expiration_date >= $1"

func (s *pgStore) CleanBlacklistedTokens() (err error) {
	_, err = s.db.Exec(deleteExpiredToken, time.Now().UTC())

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting blacklisted tokens in db.CleanBlacklistedTokens")
		return
	}
	return
}
