package db

import (
	"context"
	_ "fmt"
	"time"
	"regexp"
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
const emailRegex = `\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`
const domainRegex = `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]`

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

type FieldErrors struct {
	Field	string
	Messages []string
}

func updateFieldErrors (errors []FieldErrors, errorMessages []string, key string) ([]FieldErrors) {
	if len(errorMessages) != 0 {
		errors = append(errors, FieldErrors{
			Field: key,
			Messages: errorMessages,
		})
	}
	return errors
}

func (org *Organization) ValidateOrganization() (fieldErrors []FieldErrors, valid bool) {
	valid = true
	emailErrors := []string{}
	nameErrors := []string{}
	domainNameErrors := []string{}
	createdByErrors := []string{}
	createdOnErrors := []string{}
	updatedByErrors := []string{}
	updatedOnErrors := []string{}

	var validEmail, _ = regexp.Compile(emailRegex)
	var validDomain, _ = regexp.Compile(domainRegex)
	
	if org.Name == "" {
		nameErrors = append(nameErrors, "Can't be blank")
		valid = false
		fieldErrors = updateFieldErrors(fieldErrors, nameErrors, "name")
	}

	if validEmail.MatchString(org.ContactEmail) {
		emailErrors = append(emailErrors, "Please enter a valid email")
		valid = false
		fieldErrors = updateFieldErrors(fieldErrors, emailErrors, "email")
	}

	if validDomain.MatchString(org.DomainName) {
		domainNameErrors = append(domainNameErrors, "Please enter valid domain")
		valid = false
	}

	if org.CreatedBy == 0 {
		createdByErrors = append(createdByErrors, "Can't be blank")
		valid = false
	}

	if org.CreatedOn == (time.Time{}) {
		createdOnErrors = append(createdOnErrors, "Can't be blank")
		valid = false
	}

	if org.UpdatedBy == 0 {
		updatedByErrors = append(updatedByErrors, "Can't be blank")
		valid = false
	}

	if org.UpdatedOn == (time.Time{}) {
		updatedOnErrors = append(updatedOnErrors, "Can't be blank")
		valid = false
	}

	//TODO: Ask what other validations are expected
	
	fieldErrors = updateFieldErrors(fieldErrors, emailErrors, "email")
	fieldErrors = updateFieldErrors(fieldErrors, domainNameErrors, "domain_name")
	fieldErrors = updateFieldErrors(fieldErrors, createdByErrors, "created_by")
	fieldErrors = updateFieldErrors(fieldErrors, createdOnErrors, "created_on")
	fieldErrors = updateFieldErrors(fieldErrors, updatedByErrors, "updated_by")
	fieldErrors = updateFieldErrors(fieldErrors, updatedOnErrors, "updated_on")
	return
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

func (s *pgStore) UpdateOrganization(ctx context.Context, reqOrganization Organization, organizationID int) (err error) {
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
