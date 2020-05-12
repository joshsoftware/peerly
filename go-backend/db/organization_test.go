package db

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type OrganizationTestSuite struct {
	suite.Suite
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
	createdOrganization, err := dbStore.CreateOrganization(context.Background(), expectedOrg)

	assert.Nil(suite.T(), err)

	expectedOrg.ID = createdOrganization.ID

	assert.Equal(suite.T(), expectedOrg, createdOrganization)

	// test list organization
	var organizationsList []Organization
	organizationsList, err = dbStore.ListOrganizations(context.Background())
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), organizationsList, []Organization{createdOrganization})

	// test get organization
	var organizationData Organization
	organizationData, err = dbStore.GetOrganization(context.Background(), expectedOrg.ID)
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), organizationData, createdOrganization)

	//test update organization
	var updatedOrg Organization

	createdOrganization.Name = "Updated name"
	updatedOrg, err = dbStore.UpdateOrganization(context.Background(), createdOrganization, expectedOrg.ID)
	
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), updatedOrg, createdOrganization)

	//test delete organization
	err = dbStore.DeleteOrganization(context.Background(), createdOrganization.ID)
	
	assert.Nil(suite.T(), err)
}
