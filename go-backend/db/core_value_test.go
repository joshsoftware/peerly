package db

import (
	"context"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// needs to be implemented using https://github.com/DATA-DOG/go-sqlmock

type CoreValueTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

var coreValue = CoreValue{
	ID:          1,
	OrgID:       1,
	Text:        "test value",
	Description: "test description",
	CreatedAt:   now,
	UpdatedAt:   now,
}

func (suite *CoreValueTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *CoreValueTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *CoreValueTestSuite) TestCreateCoreValueSuccess() {
	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectQuery("INSERT INTO core value").
		WithArgs(1, 1, "test value", "test description", 1, sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateCoreValue(context.Background(), coreValue.OrgID, coreValue)

	assert.Equal(suite.T(), coreValue, resp)
	assert.Nil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestCreateCoreValueFailure() {

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectQuery("INSERT INTO core value").
		WithArgs(1, 1, "test value", "test description", 1, sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateCoreValue(context.Background(), coreValue.OrgID, coreValue)

	assert.NotEqual(suite.T(), coreValue, resp)
	assert.NotNil(suite.T(), err)
}

func (suite *CoreValueTestSuite) TestUpdateCoreValueSuccess() {

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("UPDATE core value").
		WithArgs(1, 1, "test value", "test description", 1, sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	createdCoreValue, err := suite.dbStore.UpdateCoreValue(context.Background(), coreValue.OrgID, coreValue.ID, coreValue)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), createdCoreValue, coreValue)
}

func (suite *CoreValueTestSuite) TestUpdateCoreValueFailure() {

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("UPDATE core value").
		WithArgs(1, 1, "test value", "test description", 1, sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	createdCoreValue, err := suite.dbStore.UpdateCoreValue(context.Background(), coreValue.OrgID, coreValue.ID, coreValue)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), createdCoreValue, coreValue)
}

func (suite *CoreValueTestSuite) TestGetCoreValueSuccess() {
	suite.sqlmock.ExpectQuery("SELECT").
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.GetCoreValue(context.Background(), coreValue.OrgID, coreValue.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), coreValue, resp)
}

func (suite *CoreValueTestSuite) TestDeleteCoreValueSuccess() {
	suite.sqlmock.ExpectExec("DELETE").
		WillReturnResult(sqlmock.NewResult(1, 1))

	err := suite.dbStore.DeleteCoreValue(context.Background(), coreValue.OrgID, coreValue.ID)

	assert.Nil(suite.T(), err)
}
