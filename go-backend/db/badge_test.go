package db

import (
	"context"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type BadgeTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *BadgeTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *BadgeTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *BadgeTestSuite) TestCreateBadgeSuccess() {
	badge := Badge{
		ID:               1,
		Name:             "test badge",
		OrganizationID:   1,
		Hi5CountRequired: 5,
		Hi5Frequency:     "Monthly",
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO badge").
		WithArgs(1, "Test badge", 1, 5, "Monthly").
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	CreatedBadge, err := suite.dbStore.CreateBadge(context.Background(), badge)

	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())
	assert.Equal(suite.T(), CreatedBadge, badge)
	assert.Nil(suite.T(), err)
}
func (suite *BadgeTestSuite) TestCreateBadgeFailure() {
	badge := Badge{
		ID:               1,
		Name:             "test badge",
		OrganizationID:   1,
		Hi5CountRequired: 5,
		Hi5Frequency:     "Monthly",
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO badge").
		WithArgs(1, "Test badge", 1, 5, "Monthly").
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	CreatedBadge, err := suite.dbStore.CreateBadge(context.Background(), badge)
	assert.NotEqual(suite.T(), badge, CreatedBadge)
	assert.NotNil(suite.T(), err)
}

func (suite *BadgeTestSuite) TestUpdateBadgeSuccess() {
	badge := Badge{
		ID:               1,
		Name:             "test badge",
		OrganizationID:   1,
		Hi5CountRequired: 5,
		Hi5Frequency:     "Monthly",
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO users").
		WithArgs(1, "test badge", 1, 5, "Monthly").
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	updatedBadge, err := suite.dbStore.UpdateBadge(context.Background(), badge)
	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())
	assert.Equal(suite.T(), updatedBadge, badge)
	assert.Nil(suite.T(), err)
}

func (suite *BadgeTestSuite) TestUpdateBadgeFailure() {
	badge := Badge{
		ID:               1,
		Name:             "test badge",
		OrganizationID:   1,
		Hi5CountRequired: 5,
		Hi5Frequency:     "Monthly",
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO users").
		WithArgs(1, "test badge", 1, 5, "Monthly").
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	updatedBadge, err := suite.dbStore.UpdateBadge(context.Background(), badge)
	assert.NotEqual(suite.T(), badge, updatedBadge)
	assert.NotNil(suite.T(), err)
}

func (suite *OrganizationTestSuite) TestDeleteBadgeSuccess() {
	suite.sqlmock.ExpectExec("DELETE").
		WillReturnResult(sqlmock.NewResult(1, 1))

	err := suite.dbStore.DeleteBadge(context.Background(), 1, 1)

	assert.Nil(suite.T(), err)
}
