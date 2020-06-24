package db

import (
	"context"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// Needs to be implemented using https://github.com/DATA-DOG/go-sqlmock

type UserTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *UserTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *UserTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *UserTestSuite) TestCreateNewUserSuccess() {
	user := User{
		Name:            "test user",
		OrgID:           1,
		Email:           "testuser@gmail.com",
		DisplayName:     "test",
		ProfileImageURL: "test.jpeg",
		RoleID:          1,
		Hi5QuotaBalance: 5,
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO users").
		WithArgs("test user", 1, "testuser@gmail.com", "test", "test.jpeg", 1, 1).
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	createdUser, err := suite.dbStore.CreateNewUser(context.Background(), user)

	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())
	assert.Equal(suite.T(), createdUser, user)
	assert.Nil(suite.T(), err)
}

func (suite *UserTestSuite) TestCreateNewUserFailure() {
	user := User{
		Name:            "test user",
		OrgID:           1,
		Email:           "testuser@gmail.com",
		DisplayName:     "test",
		ProfileImageURL: "test.jpeg",
		RoleID:          1,
		Hi5QuotaBalance: 5,
	}
	suite.db.Close()
	suite.sqlmock.ExpectBegin()
	suite.sqlmock.ExpectExec("INSERT INTO users").
		WithArgs("test user", 1, "testuser@gmail.com", "test", "test.jpeg", 1, 1).
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectRollback()

	_, err := suite.dbStore.CreateNewUser(context.Background(), user)

	assert.NotNil(suite.T(), err)
}

func (suite *UserTestSuite) TestUpdateUserSuccess() {
	user := User{
		Name:            "test user",
		OrgID:           1,
		Email:           "testuser@gmail.com",
		DisplayName:     "test",
		ProfileImageURL: "test.jpeg",
		RoleID:          1,
		Hi5QuotaBalance: 5,
	}

	suite.sqlmock.ExpectBegin()

	UpdatedUser, err := suite.dbStore.UpdateUser(context.Background(), user, 1)

	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())
	assert.Equal(suite.T(), UpdatedUser, user)
	assert.Nil(suite.T(), err)
}

func (suite *UserTestSuite) TestUpdateUserFailure() {
	user := User{
		Name:            "test user",
		OrgID:           1,
		Email:           "testuser@gmail.com",
		DisplayName:     "test",
		ProfileImageURL: "test.jpeg",
		RoleID:          1,
		Hi5QuotaBalance: 5,
	}
	suite.sqlmock.ExpectBegin()
	updatedUser, err := suite.dbStore.UpdateUser(context.Background(), user, 1)
	assert.NotEqual(suite.T(), user, updatedUser)
	assert.NotNil(suite.T(), err)
}
