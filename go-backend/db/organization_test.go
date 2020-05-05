package db

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
	"joshsoftware/peerly/config"
	"testing"
	logger "github.com/sirupsen/logrus"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type OrganizationTestSuite struct {
	suite.Suite
	dbStore Storer
}

func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(OrganizationTestSuite))
	suite.Run(t, new(CoreValueTestSuite))
}

func (suite *OrganizationTestSuite) SetupSuite() {
	config.Load("application_test")

	err := RunMigrations()
	if err!=nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
	}

	store, err := Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
  suite.dbStore = store
}

func (suite *OrganizationTestSuite) TestOrganizationsSuccess() {

// test create organization
 	expectedOrg := Organization{
		Name:"test organization",
		ContactEmail: "test@gmail.com",
		DomainName: "www.testdomain.com",
		SubscriptionStatus: 1,
		SubscriptionValidUpto: 1588073442241,
		Hi5Limit: 5,
		Hi5QuotaRenewalFrequency: "2",
		Timezone: "IST",
	}
	var err error
	createdOrganization, err := suite.dbStore.CreateOrganization(context.Background(), expectedOrg)

	assert.Nil(suite.T(), err)

	expectedOrg.ID = createdOrganization.ID

	assert.Equal(suite.T(), expectedOrg, createdOrganization)

	// test list organization
	var organizationsList []Organization
	organizationsList, err = suite.dbStore.ListOrganizations(context.Background())
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), organizationsList, []Organization{createdOrganization})

	// test get organization
	var organizationData Organization
	organizationData, err = suite.dbStore.GetOrganization(context.Background(), expectedOrg.ID)
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), organizationData, createdOrganization)

	//test update organization
	var updatedOrg Organization

	createdOrganization.Name = "Updated name"
	updatedOrg, err = suite.dbStore.UpdateOrganization(context.Background(), createdOrganization, expectedOrg.ID)
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), updatedOrg, createdOrganization)

	//test delete organization
	err = suite.dbStore.DeleteOrganization(context.Background(), createdOrganization.ID)
	
	assert.Nil(suite.T(), err)
}

// TODO run migrations conflicts for multiple test files
// TODO teardown function
