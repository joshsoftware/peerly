package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

const (
	weeklyRenewalFrequency  = "WEEKLY"
	monthlyRenewalFrequency = "MONTHLY"
	startDayOfWeek          = "MONDAY"
	firstDayInMonth         = 1

	updateHi5QuotaBalanceQuery = `UPDATE users SET hi5_quota_balance=$1 where org_id = $2 AND soft_delete = $3`
)

func (s *pgStore) UpdateHi5QuotaRenewalFrequencyOfUsers(organization Organization) (err error) {
	_, err = s.db.Exec(
		updateHi5QuotaBalanceQuery,
		organization.Hi5Limit,
		organization.ID,
		false,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while updating user's Hi5 quota balance")
		return
	}
	return

}

//ResetHi5QuotaBalanceJob - called to execute cron job for reset Hi5_quota_balance
func (s *pgStore) ResetHi5QuotaBalanceJob() (err error) {
	organizations, err := s.ListOrganizations(context.Background())
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error while getting organization list")
	}
	for _, organization := range organizations {

		if organization.Hi5QuotaRenewalFrequency == weeklyRenewalFrequency {
			weekday := time.Now().Weekday()
			if weekday.String() == startDayOfWeek {
				err = s.UpdateHi5QuotaRenewalFrequencyOfUsers(organization)
				if err != nil {
					logger.WithField("err", err.Error()).Error("Error while updating user's Hi5 quota balance")
					return
				}
			}

		} else if organization.Hi5QuotaRenewalFrequency == monthlyRenewalFrequency {
			year, month, day := time.Now().Date()
			firstDayOfMonth := time.Date(year, month, firstDayInMonth, 0, 0, 0, 0, time.Now().Location())
			currentDay := time.Date(year, month, day, 0, 0, 0, 0, time.Now().Location())
			if firstDayOfMonth.Equal(currentDay) {

				err = s.UpdateHi5QuotaRenewalFrequencyOfUsers(organization)
				if err != nil {
					logger.WithField("err", err.Error()).Error("Error while updating user's Hi5 quota balance")
					return
				}
			}
		}
	}
	return
}
