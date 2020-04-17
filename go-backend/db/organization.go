package db

import (
	"context"
	"time"
	logger "github.com/sirupsen/logrus"
)

type Organization struct {
	ID int `db:"id" json:"id"`
	Name string `db:"name" json:"full_name"`
	ContactEmail string `db:"contact_email" json:"email"`
	DomainName string `db:"domain_name" json:"domain_name"`
	SubscriptionStatus int `db:"subscription_status" json:"subscription_status"`
	SubscriptionValidUpto time.Time `db:"subscription_valid_upto" json:"subscription_valid_upto"`
	Hi5Limit int `db:"hi5_limit" json:"hi5_limit"`
	Hi5QuotaRenewalFrequency string `db:"hi5_quota_renewal_frequency" json:"hi5_quota_renewal_frequency"`
	Timezone string `db:"timezone" json:"timezone"`
	CreatedBy int `db:"created_by" json:"created_by"`
	UpdatedBy int `db:"updated_by" json:"updated_by"`
	UpdatedOn time.Time `db:"updated_on" json:"updated_on"`
}

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (org_id int, err error) {
	createOrganizationQuery := `INSERT INTO organizations VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
	_, err = s.db.Exec(createOrganizationQuery, org.Name, org.ContactEmail, org.DomainName, org.SubscriptionStatus,
		org.SubscriptionValidUpto, org.Hi5Limit, org.Hi5QuotaRenewalFrequency, org.Timezone, org.CreatedBy,
		org.UpdatedBy, time.Now())
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating organization")
		return
	}

	return
}
