package db

import (
	"context"
	"time"
	logger "github.com/sirupsen/logrus"
)

const CreateOrganisationQuery = `INSERT INTO organizations (
	name,
	contact_email,
	domain_name,
	subscription_status,
	subscription_valid_upto,
	hi5_limit,
	hi5_quota_renewal_frequency,
	timezone,
	created_by,
	updated_by)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

const UpdateOrganizationQuery = `UPDATE organizations SET (
	name,
	contact_email,
	domain_name,
	subscription_status,
	subscription_valid_upto,
	hi5_limit,
	hi5_quota_renewal_frequency,
	timezone,
	updated_by,
	updated_on) = 
	($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) where id = $11`

const DeleteOrganizationQuery = `DELETE FROM organizations WHERE id = $1`
const GetOrganizationQuery = `SELECT * FROM organizations WHERE id=$1`

type Organization struct {
	ID                       int       `db:"id" json:"id"`
	Name                     string    `db:"name" json:"name"`
	ContactEmail             string    `db:"contact_email" json:"email"`
	DomainName               string    `db:"domain_name" json:"domain_name"`
	SubscriptionStatus       int       `db:"subscription_status" json:"subscription_status"`
	SubscriptionValidUpto    time.Time `db:"subscription_valid_upto" json:"subscription_valid_upto"`
	Hi5Limit                 int    `db:"hi5_limit" json:"hi5_limit"`
	Hi5QuotaRenewalFrequency string    `db:"hi5_quota_renewal_frequency" json:"hi5_quota_renewal_frequency"`
	Timezone                 string    `db:"timezone" json:"timezone"`
	CreatedBy                int    `db:"created_by" json:"_"`
	CreatedOn                time.Time `db:"created_on" json:"_"`
	UpdatedBy                int    `db:"updated_by" json:"_"`
	UpdatedOn                time.Time `db:"updated_on" json:"_"`
}

func (s *pgStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {

	err = s.db.Select(&organizations, "SELECT * FROM organizations ORDER BY name ASC")
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing organizations")
		return
	}

	return
}

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (err error) {

	_, err = s.db.Exec(
		CreateOrganisationQuery,
		org.Name,
		org.ContactEmail,
		org.DomainName,
		org.SubscriptionStatus,
		org.SubscriptionValidUpto,
		org.Hi5Limit,
		org.Hi5QuotaRenewalFrequency,
		org.Timezone,
		org.CreatedBy,
		org.UpdatedBy,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating organization")
		return
	}

	return
}

func (s *pgStore) UpdateOrganization(ctx context.Context, org Organization, organizationID int) (err error) {

		_, err = s.db.Exec(
			UpdateOrganizationQuery,
			org.Name,
			org.ContactEmail,
			org.DomainName,
			org.SubscriptionStatus,
			org.SubscriptionValidUpto,
			org.Hi5Limit,
			org.Hi5QuotaRenewalFrequency,
			org.Timezone,
			org.UpdatedBy,
			time.Now(),
			organizationID,
		)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating organization")
			return
		}
		return
}

func (s *pgStore) DeleteOrganization(ctx context.Context, organizationID int) (err error) {

	_, err = s.db.Exec(
		DeleteOrganizationQuery,
		organizationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting organization")
		return
	}
	return
}

func (s *pgStore) GetOrganization(ctx context.Context, organizationID int) (organization Organization, err error) {

	err = s.db.Get(&organization, GetOrganizationQuery, organizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error fetching organization")
		return
	}

	return
}