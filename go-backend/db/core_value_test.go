package db

import (
	"context"
	"github.com/jmoiron/sqlx"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"joshsoftware/peerly/config"
)

type CoreValueTestSuite struct {
	suite.Suite
	db               *sqlx.DB
	dbStore          Storer
	OrganizationID   int64
	CoreValueCreated CoreValue
}

func (suite *CoreValueTestSuite) Init() {
	config.Load("application_test")

	err := RunMigrations()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
	}

	store, err := Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
	suite.dbStore = store
	suite.db = getDBConn()
}

func (suite *CoreValueTestSuite) SetupTest() {
	suite.Init()
	org := Organization{
		Name:                     "test organization",
		ContactEmail:             "test@gmail.com",
		DomainName:               "www.testdomain.com",
		SubscriptionStatus:       1,
		SubscriptionValidUpto:    1588073442241,
		Hi5Limit:                 5,
		Hi5QuotaRenewalFrequency: "2",
		Timezone:                 "IST",
	}
	organization, _ := suite.dbStore.CreateOrganization(context.Background(), org)
	suite.OrganizationID = int64(organization.ID)

	coreValueTest := CoreValue{
		Text:        "Test Text",
		Description: "Test Description",
	}
	suite.CoreValueCreated, _ = suite.dbStore.CreateCoreValue(context.Background(), suite.OrganizationID, coreValueTest)
}

func (suite *CoreValueTestSuite) TestCreateCoreValueSuccess() {
	expectedCoreValue := CoreValue{
		Text:        "Test Text",
		Description: "Test Description",
	}
	createdCoreValue, err := suite.dbStore.CreateCoreValue(context.Background(), suite.OrganizationID, expectedCoreValue)

	assert.Nil(suite.T(), err)
	expectedCoreValue.ID = createdCoreValue.ID
	expectedCoreValue.OrgID = createdCoreValue.OrgID

	assert.Equal(suite.T(), expectedCoreValue, createdCoreValue)

	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, createdCoreValue.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
}

func (suite *CoreValueTestSuite) TestCreateCoreValueFailed() {
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
	suite.db.Close()

	expectedCoreValue := CoreValue{
		Text:        "Test Text",
		Description: "Test Description",
	}
	_, err := suite.dbStore.CreateCoreValue(context.Background(), suite.OrganizationID, expectedCoreValue)

	assert.NotNil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestListCoreValueSuccess() {
	coreValues, err := suite.dbStore.ListCoreValues(context.Background(), suite.OrganizationID)
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), []CoreValue{suite.CoreValueCreated}, coreValues)

	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
}

func (suite *CoreValueTestSuite) TestListCoreValueFailed() {
	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
	suite.db.Close()

	_, err := suite.dbStore.ListCoreValues(context.Background(), suite.OrganizationID)
	assert.NotNil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestGetCoreValueSuccess() {
	coreValue, err := suite.dbStore.GetCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), suite.CoreValueCreated, coreValue)

	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
}

func (suite *CoreValueTestSuite) TestGetCoreValueFailed() {
	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
	suite.db.Close()

	_, err := suite.dbStore.GetCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	assert.NotNil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestUpdateCoreValueSuccess() {
	suite.CoreValueCreated.Text = "Text Update"
	updatedCoreValue, err := suite.dbStore.UpdateCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID, suite.CoreValueCreated)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), suite.CoreValueCreated, updatedCoreValue)

	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
}

func (suite *CoreValueTestSuite) TestUpdateCoreValueFailed() {
	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
	suite.db.Close()

	suite.CoreValueCreated.Text = "Text Update"
	_, err := suite.dbStore.UpdateCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID, suite.CoreValueCreated)

	assert.NotNil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestDeleteCoreValueSuccess() {
	err := suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)

	assert.Nil(suite.T(), err)

	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
}

func (suite *CoreValueTestSuite) TestDeleteCoreValueFailed() {
	suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	suite.dbStore.DeleteOrganization(context.Background(), int(suite.OrganizationID))
	suite.db.Close()

	err := suite.dbStore.DeleteCoreValue(context.Background(), suite.OrganizationID, suite.CoreValueCreated.ID)
	assert.NotNil(suite.T(), err)
}
