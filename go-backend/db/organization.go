package db

import (
	"context"
	"time"
	"regexp"
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
		timezone,
		created_by,
		updated_by)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`

	updateOrganizationQuery = `UPDATE organizations SET (
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

	deleteOrganizationQuery = `DELETE FROM organizations WHERE id = $1`

	getOrganizationQuery = `SELECT id,
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
	
	listOrganizationsQuery =`SELECT id,
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
	emailRegex = `^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$`
	domainRegex = `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]`
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
	CreatedBy                int				`db:"created_by" json:"_"`
	CreatedOn                int64				`db:"created_on" json:"_"`
	UpdatedBy                int				`db:"updated_by" json:"_"`
	UpdatedOn                int64				`db:"updated_on" json:"_"`
}

//TODO how to declare this as reusable
type ErrorResponse struct {
	Code 	string `json:"code"`
	Message	string `json:"message"`
	Fields map[string]string `json:"fields"`
}

var validEmail = regexp.MustCompile(emailRegex)
var validDomain = regexp.MustCompile(domainRegex)

func (org *Organization) Validate() (errorResponse map[string]ErrorResponse, valid bool) {
	fieldErrors := make(map[string]string)

	if org.Name == "" {
		fieldErrors["name"] = "Can't be blank"
	}

	if !validEmail.MatchString(org.ContactEmail) {
		fieldErrors["email"] = "Please enter a valid email"
	}

	if !validDomain.MatchString(org.DomainName) {
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

func (s *pgStore) CreateOrganization(ctx context.Context, org Organization) (updatedOrganization Organization, err error) {

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
		org.CreatedBy,
		org.UpdatedBy,
	).Scan(&lastInsertId)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Error creating organization")
		return
	}

	err = s.db.Get(&updatedOrganization, getOrganizationQuery, lastInsertId)

	return
}

func (s *pgStore) UpdateOrganization(ctx context.Context, reqOrganization Organization, organizationID int) (updatedOrganization Organization, err error) {
		var dbOrganization Organization
		err = s.db.Get(&dbOrganization, getOrganizationQuery, organizationID)

		reqOrganization.CreatedOn = dbOrganization.CreatedOn
		reqOrganization.CreatedBy = dbOrganization.CreatedBy

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
			reqOrganization.UpdatedBy,
			time.Now(),
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
