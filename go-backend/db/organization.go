package db

import (
	"context"
	"time"

	logger "github.com/sirupsen/logrus"
)

type Organization struct {
	ID                       int       `db:"id" json:"id"`
	Name                     string    `db:"name" json:"name"`
	ContactEmail             string    `db:"contact_email" json:"email"`
	DomainName               string    `db:"domain_name" json:"domain_name"`
	SubscriptionStatus       int       `db:"subscription_status" json:"subscription_status"`
	SubscriptionValidUpto    time.Time `db:"subscription_valid_upto" json:"subscription_valid_upto"`
	Hi5Limit                 string    `db:"hi5_limit" json:"hi5_limit"`
	Hi5QuotaRenewalFrequency string    `db:"hi5_quota_renewal_frequency" json:"hi5_quota_renewal_frequency"`
	Timezone                 string    `db:"timezone" json:"timezone"`
	CreatedBy                string    `db:"created_by" json:"created_by"`
	CreatedOn                time.Time `db:"created_on" json:"created_on"`
	UpdatedBy                string    `db:"updated_by" json:"updated_by"`
	UpdatedOn                time.Time `db:"updated_on" json:"updated_on"`
}

func (s *pgStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {
	err = s.db.Select(&organizations, "SELECT * FROM organizations ORDER BY name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing organizations")
		return
	}

	return
}

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (orgizationID int, err error) {
	createOrganizationQuery := `
		INSERT INTO organizations (
			name,
			contact_email,
			domain_name,
			subscription_status,
			subscription_valid_upto,
			hi5_limit,
			hi5_quota_renewal_frequency,
			timezone,
			created_by,
			created_on,
			updated_by,
			updated_on)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
	`
	_, err = s.db.Exec(
		createOrganizationQuery,
		org.Name,
		org.ContactEmail,
		org.DomainName,
		org.SubscriptionStatus,
		org.SubscriptionValidUpto,
		org.Hi5Limit,
		org.Hi5QuotaRenewalFrequency,
		org.Timezone,
		org.CreatedBy,
		org.CreatedOn,
		org.UpdatedBy,
		time.Now(),
	)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating organization")
		return
	}

	return
}

func (s *pgStore) DeleteOrganization(ctx context.Context, organizationID int) (ok bool, err error) {
	ok = false
	deleteOrganizationQuery := `DELETE FROM organizations WHERE id = $1`

	result, err := s.db.Exec(
		deleteOrganizationQuery,
		organizationID,
	)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting organization")
		return
	}

	_, err = result.RowsAffected()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting organization")
		return
	}

	ok = true
	return
}
