package db

import (
	"context"
	"time"
	"regexp"
	logger "github.com/sirupsen/logrus"
)

const (
	CreateOrganizationQuery = `INSERT INTO organizations (
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

	UpdateOrganizationQuery = `UPDATE organizations SET (
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

	DeleteOrganizationQuery = `DELETE FROM organizations WHERE id = $1`
	GetOrganizationQuery = `SELECT id,
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
		updated_on FROM organizations WHERE id=$1`
	
	ListOrganizationsQuery =`SELECT id,
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
		updated_on FROM organizations ORDER BY name ASC`
	emailRegex = 	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
	domainRegex = `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]`
)

type Organization struct {
	ID                       int       `db:"id" json:"id" `
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

//TODO how to declare this as reusable
type ErrorResponse struct {
	Code 	string `json:"code"`
	Message	string `json:"message"`
	Fields map[string]string `json:"fields"`
}

func (org *Organization) ValidateOrganization() (errorResponse map[string]ErrorResponse, valid bool) {

	valid = true
	fieldErrors := make(map[string]string)
	var validEmail, _ = regexp.Compile(emailRegex)
	var validDomain, _ = regexp.Compile(domainRegex)
	
	if org.Name == "" {
		valid = false
		fieldErrors["name"] = "Can't be blank"
	}

	if !validEmail.MatchString(org.ContactEmail) {
		valid = false
		fieldErrors["email"] = "Please enter a valid email"
	}

	if !validDomain.MatchString(org.DomainName) {
		fieldErrors["domain_name"] = "Please enter valid domain"
		valid = false
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

	err = s.db.Select(&organizations, ListOrganizationsQuery)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error listing organizations")
		return
	}

	return
}

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (err error) {

	_, err = s.db.Exec(
		CreateOrganizationQuery,
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

func (s *pgStore) UpdateOrganization(ctx context.Context, reqOrganization Organization, organizationID int) (updatedOrganization Organization, err error) {

		var dbOrganization Organization
		err = s.db.Get(&dbOrganization, GetOrganizationQuery, organizationID)

		reqOrganization.CreatedOn = dbOrganization.CreatedOn
		reqOrganization.CreatedBy = dbOrganization.CreatedBy

		_, err = s.db.Exec(
			UpdateOrganizationQuery,
			reqOrganization.Name,
			reqOrganization.ContactEmail,
			reqOrganization.DomainName,
			reqOrganization.SubscriptionStatus,
			reqOrganization.SubscriptionValidUpto,
			reqOrganization.Hi5Limit,
			reqOrganization.Hi5QuotaRenewalFrequency,
			reqOrganization.Timezone,
			reqOrganization.UpdatedBy,
			time.Now(),
			organizationID,
		)
		if err != nil {
			logger.WithField("err", err.Error()).Error("Error updating organization")
			return
		}
		
		updatedOrganization = reqOrganization
		updatedOrganization.ID = dbOrganization.ID

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
