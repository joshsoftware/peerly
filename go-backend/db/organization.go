package db

import (
	"context"
	logger "github.com/sirupsen/logrus"
)

const (
	createOrganizationQuery = `INSERT INTO organizations (
		name,
		contact_email,
		domain_name,
		subscription_status,
		subscription_valid_upto,
		hi5_limit,
		hi5_quota_renewal_frequency,
		timezone)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	updateOrganizationQuery = `UPDATE organizations SET (
		name,
		contact_email,
		domain_name,
		subscription_status,
		subscription_valid_upto,
		hi5_limit,
		hi5_quota_renewal_frequency,
		timezone) = 
		($1, $2, $3, $4, $5, $6, $7, $8) where id = $9`

	deleteOrganizationQuery = `DELETE FROM organizations WHERE id = $1`

	getOrganizationQuery = `SELECT id,
		name,
		contact_email,
		domain_name,
		subscription_status,
		subscription_valid_upto,
		hi5_limit,
		hi5_quota_renewal_frequency,
		timezone FROM organizations WHERE id=$1`
	
	listOrganizationsQuery =`SELECT id,
		name,
		contact_email,
		domain_name,
		subscription_status,
		subscription_valid_upto,
		hi5_limit,
		hi5_quota_renewal_frequency,
		timezone FROM organizations ORDER BY name ASC`
)

type Organization struct {
	ID                       int				`db:"id" json:"id" `
	Name                     string				`db:"name" json:"name"`
	ContactEmail             string				`db:"contact_email" json:"email"`
	DomainName               string				`db:"domain_name" json:"domain_name"`
	SubscriptionStatus       int				`db:"subscription_status" json:"subscription_status"`
	SubscriptionValidUpto    int64				`db:"subscription_valid_upto" json:"subscription_valid_upto"`
	Hi5Limit                 int				`db:"hi5_limit" json:"hi5_limit"`
	Hi5QuotaRenewalFrequency string				`db:"hi5_quota_renewal_frequency" json:"hi5_quota_renewal_frequency"`
	Timezone                 string				`db:"timezone" json:"timezone"`
}

func (org *Organization) Validate() (errorResponse map[string]ErrorResponse, valid bool) {
	fieldErrors := make(map[string]string)

	if org.Name == "" {
		fieldErrors["name"] = "Can't be blank"
	}

	if !emailRegex.MatchString(org.ContactEmail) {
		fieldErrors["email"] = "Please enter a valid email"
	}

	if !domainRegex.MatchString(org.DomainName) {
		fieldErrors["domain_name"] = "Please enter valid domain"
	}

	if len(fieldErrors) == 0 {
		valid = true
		return
	}

	errorResponse = map[string]ErrorResponse{"error": ErrorResponse{
			Code: "invalid_data",
			Message: "Please provide valid organization data",
			Fields: fieldErrors,
		},
	}

	//TODO: Ask what other validations are expected
	
	return
}

func (s *pgStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {
	err = s.db.Select(&organizations, listOrganizationsQuery)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing organizations")
		return
	}

	return
}

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (createdOrganization Organization, err error) {

	lastInsertId := 0
	 err = s.db.QueryRow(
		createOrganizationQuery,
		org.Name,
		org.ContactEmail,
		org.DomainName,
		org.SubscriptionStatus,
		org.SubscriptionValidUpto,
		org.Hi5Limit,
		org.Hi5QuotaRenewalFrequency,
		org.Timezone,
	).Scan(&lastInsertId)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating organization")
		return
	}

	err = s.db.Get(&createdOrganization, getOrganizationQuery, lastInsertId)

	return
}

func (s *pgStore) UpdateOrganization(ctx context.Context, reqOrganization Organization, organizationID int) (updatedOrganization Organization, err error) {
		var dbOrganization Organization
		err = s.db.Get(&dbOrganization, getOrganizationQuery, organizationID)

		_, err = s.db.Exec(
			updateOrganizationQuery,
			reqOrganization.Name,
			reqOrganization.ContactEmail,
			reqOrganization.DomainName,
			reqOrganization.SubscriptionStatus,
			reqOrganization.SubscriptionValidUpto,
			reqOrganization.Hi5Limit,
			reqOrganization.Hi5QuotaRenewalFrequency,
			reqOrganization.Timezone,
			organizationID,
		)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating organization")
			return
		}

		err = s.db.Get(&updatedOrganization, getOrganizationQuery, organizationID)

		return
}

func (s *pgStore) DeleteOrganization(ctx context.Context, organizationID int) (err error) {
	_, err = s.db.Exec(
		deleteOrganizationQuery,
		organizationID,
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error deleting organization")
		return
	}

	return
}

func (s *pgStore) GetOrganization(ctx context.Context, organizationID int) (organization Organization, err error) {
	err = s.db.Get(&organization, getOrganizationQuery, organizationID)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error fetching organization")
		return
	}

	return
}
