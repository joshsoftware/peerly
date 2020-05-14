package db

import (
	"context"
	"joshsoftware/peerly/config"

	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type UserTestSuite struct {
	suite.Suite
	dbStore Storer
}

func (suite *UserTestSuite) SetupSuite() {
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

func (suite *UserTestSuite) TestUserSuccess() {
	// suppose I have created user with this details already
	expectedUser := User{
		OrgID:           1,
		FirstName:       "test1",
		LastName:        "test2",
		Email:           "testuser@gmail.com",
		DisplayName:     "test user",
		ProfileImage:    "test.jpg",
		RoleID:          1,
		Hi5QuotaBalance: 5,
	}
	var err error

	expectedUser.ID = 1
	// test get user
	var accessedUserData User
	accessedUserData, err = suite.dbStore.GetUser(context.Background(), expectedUser.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), accessedUserData, expectedUser)

	// test list user
	var usersList []User
	usersList, err = suite.dbStore.ListUsers(context.Background())

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), usersList, []User{accessedUserData})

	//test update user
	var updatedUser User

	accessedUserData.LastName = "test_last_name"
	accessedUserData.Hi5QuotaBalance = 9
	updatedUser, err = suite.dbStore.UpdateUser(context.Background(), accessedUserData, expectedUser.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), updatedUser, accessedUserData)

}
