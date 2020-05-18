package db

import (
	"context"
	"joshsoftware/peerly/config"
	"testing"

	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type BadgeHandlerTestSuite struct {
	suite.Suite
	dbStore Storer
}

func TestBadgeTestSuite(t *testing.T) {
	suite.Run(t, new(BadgeHandlerTestSuite))
}

func (suite *OrganizationTestSuite) SetupBadgeSuite() {
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
}

func (suite *OrganizationTestSuite) TestBadgeSuccess() {

	// test create badge
	expectedBadge := Badge{
		Name:             "test badges",
		OrganizationID:   999,
		Hi5CountRequired: 5,
		Hi5Frequency:     "2",
	}
	var err error
	createdBadge, err := suite.dbStore.CreateBadge(context.Background(), expectedBadge)

	assert.Nil(suite.T(), err)

	expectedBadge.ID = createdBadge.ID

	assert.Equal(suite.T(), expectedBadge, createdBadge)

	// test list badge
	var badgeList []Badge
	badgeList, err = suite.dbStore.ListBadges(context.Background(), expectedBadge.OrganizationID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), badgeList, []Badge{createdBadge})

	// test get badge
	var badgeData Badge
	badgeData, err = suite.dbStore.ShowBadge(context.Background(), expectedBadge)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), badgeData, createdBadge)

	//test update badge
	var updatedOrg Badge

	createdBadge.Name = "Updated name"
	updatedOrg, err = suite.dbStore.UpdateBadge(context.Background(), createdBadge)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), updatedOrg, createdBadge)

	//test delete badge
	err = suite.dbStore.DeleteBadge(context.Background(), createdBadge.OrganizationID, createdBadge.ID)

	assert.Nil(suite.T(), err)
}
