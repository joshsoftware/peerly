package db

import(
  "fmt"
  "time"
  // logger "github.com/sirupsen/logrus"
)

func (s *pgStore) CleanBlacklistedTokens() {
  // var err error
  fmt.Printf("Deleting from user_blacklisted_tokens...\n")
  s.db.MustExec("DELETE FROM user_blacklisted_tokens WHERE expiration_date >= $1", time.Now().UTC())
  // if err != nil {
  //   logger.WithField("err", err.Error()).Error("Error deleting blacklisted tokens in db.CleanBlacklistedTokens")
  //   return
  // }
  return
}
