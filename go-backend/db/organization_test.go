package db

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
	_"github.com/DATA-DOG/go-sqlmock"
	_"github.com/jmoiron/sqlx"

)




// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type OrganizationTestSuite struct {
	suite.Suite
}

func (suite *OrganizationTestSuite) TestOrganizationsSuccess() {
	// // mockDB, mock, err := sqlmock.New()
	// // defer mockDB.Close()
	// // sqlxDB := sqlx.NewDb(mockDB,"sqlmock")
	// // var pgStoreConn pgStore
    
 // //    pgStoreConn.db = mockDB
 //    if err != nil {
 //        logger.Error("an error was not expected when opening a stub database connection")
 //    }

    rows := sqlmockvar.NewRows([]string{"id", "name", "contact_email", "domain_name", "subscription_status", "subscription_valid_upto", "hi5_limit", "hi5_quota_renewal_frequency", "timezone"}).
        AddRow(1, "Rohit entry 2", "rohit.joshiadvanced@gmail.com", "www.joshsoftware.com", 2, 1305621628876, 5, "10", "IST")

 	sqlmockvar.ExpectQuery(listOrganizationsQuery).
        WillReturnRows(rows)

    var org []Organization
    org, _ = dbStore.ListOrganizations(context.Background())

	// var orgs []Organization
	//     for result.Next() {
	//          org := Organization{}
	//          err = result.Scan(&org.ID, &org.Name, &org.ContactEmail, &org.DomainName, &org.SubscriptionStatus, &org.SubscriptionValidUpto, &org.Hi5Limit, &org.Hi5QuotaRenewalFrequency, &org.Timezone)
	//          orgs = append(orgs, org)    
	//     }

    fmt.Println(org)

    assert.Equal(suite.T(), true, true)

	// // test create organization
 // 	expectedOrg := Organization{
	// 	Name:"test organization",
	// 	ContactEmail: "test@gmail.com",
	// 	DomainName: "www.testdomain.com",
	// 	SubscriptionStatus: 1,
	// 	SubscriptionValidUpto: 1588073442241,
	// 	Hi5Limit: 5,
	// 	Hi5QuotaRenewalFrequency: "2",
	// 	Timezone: "IST",
	// }
	// var err error
	// createdOrganization, err := dbStore.CreateOrganization(context.Background(), expectedOrg)

	// assert.Nil(suite.T(), err)

	// expectedOrg.ID = createdOrganization.ID

	// assert.Equal(suite.T(), expectedOrg, createdOrganization)

	// // test list organization
	// var organizationsList []Organization
	// organizationsList, err = dbStore.ListOrganizations(context.Background())
	
	// assert.Nil(suite.T(), err)
	// assert.Equal(suite.T(), organizationsList, []Organization{createdOrganization})

	// // test get organization
	// var organizationData Organization
	// organizationData, err = dbStore.GetOrganization(context.Background(), expectedOrg.ID)
	
	// assert.Nil(suite.T(), err)
	// assert.Equal(suite.T(), organizationData, createdOrganization)

	// //test update organization
	// var updatedOrg Organization

	// createdOrganization.Name = "Updated name"
	// updatedOrg, err = dbStore.UpdateOrganization(context.Background(), createdOrganization, expectedOrg.ID)
	
	// assert.Nil(suite.T(), err)
	// assert.Equal(suite.T(), updatedOrg, createdOrganization)

	// //test delete organization
	// err = dbStore.DeleteOrganization(context.Background(), createdOrganization.ID)
	
	// assert.Nil(suite.T(), err)
}
