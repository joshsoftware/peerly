package db

import (
	"context"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"time"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type OrganizationTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

var testTime, _ = time.Parse(time.RFC3339, "2006-01-02T15:04:05Z")

var mockedRows *sqlmock.Rows

var expectedOrg = Organization{
	ID:                       1,
	Name:                     "test organization",
	ContactEmail:             "test@gmail.com",
	DomainName:               "www.testdomain.com",
	SubscriptionStatus:       1,
	SubscriptionValidUpto:    1588073442241,
	Hi5Limit:                 5,
	Hi5QuotaRenewalFrequency: "2",
	Timezone:                 "IST",
}

func (suite *OrganizationTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
	mockedRows = suite.getMockedRows()
}

func (suite *OrganizationTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *OrganizationTestSuite) getMockedRows() (mockedRows *sqlmock.Rows) {
	mockedRows = suite.sqlmock.NewRows([]string{"id", "name", "contact_email", "domain_name", "subscription_status", "subscription_valid_upto", "hi5_limit", "hi5_quota_renewal_frequency", "timezone"}).
		AddRow(1, "test organization", "test@gmail.com", "www.testdomain.com", 1, 1588073442241, 5, "2", "IST")
	return
}

func (suite *OrganizationTestSuite) TestOrganizationsFailure() {
	suite.db.Close() //Close connection to test failure case

	suite.sqlmock.ExpectQuery(listOrganizationsQuery).
		WillReturnRows(mockedRows)

	_, err := suite.dbStore.ListOrganizations(context.Background())
	assert.NotNil(suite.T(), err)

	_, err = suite.dbStore.UpdateOrganization(context.Background(), expectedOrg, expectedOrg.ID)
	assert.NotNil(suite.T(), err)

	_, err = suite.dbStore.CreateOrganization(context.Background(), expectedOrg)
	assert.NotNil(suite.T(), err)

	_, err = suite.dbStore.GetOrganization(context.Background(), expectedOrg.ID)
	assert.NotNil(suite.T(), err)

	err = suite.dbStore.DeleteOrganization(context.Background(), expectedOrg.ID)
	assert.NotNil(suite.T(), err)
}

func (suite *OrganizationTestSuite) TestListOrganizationsSuccess() {
	suite.sqlmock.ExpectQuery(listOrganizationsQuery).
		WillReturnRows(mockedRows)

	org, err := suite.dbStore.ListOrganizations(context.Background())

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), []Organization{expectedOrg}, org)
}

func (suite *OrganizationTestSuite) TestUpdateOrganizationSuccess() {
	suite.sqlmock.ExpectExec("UPDATE organizations").
		WithArgs("test organization", "test@gmail.com", "www.testdomain.com", 1, 1588073442241, 5, "2", "IST", 1).
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectQuery("SELECT").
		WillReturnRows(mockedRows)

	org, err := suite.dbStore.UpdateOrganization(context.Background(), expectedOrg, expectedOrg.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), expectedOrg, org)
}

func (suite *OrganizationTestSuite) TestGetOrganizationSuccess() {
	suite.sqlmock.ExpectQuery("SELECT").
		WillReturnRows(mockedRows)

	org, err := suite.dbStore.GetOrganization(context.Background(), expectedOrg.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), expectedOrg, org)
}

func (suite *OrganizationTestSuite) TestDeleteOrganizationSuccess() {
	suite.sqlmock.ExpectExec("DELETE").
		WillReturnResult(sqlmock.NewResult(1, 1))

	err := suite.dbStore.DeleteOrganization(context.Background(), expectedOrg.ID)

	assert.Nil(suite.T(), err)
}
