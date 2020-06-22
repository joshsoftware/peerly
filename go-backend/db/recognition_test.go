package db

import (
	"context"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type RecognitionTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *RecognitionTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *RecognitionTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *RecognitionTestSuite) TestCreateRecognitionSuccess() {
	recognition := Recognition{
		CoreValueID: 1,
		Text:        "Test Text",
		GivenFor:    1,
		GivenBy:     2,
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO recognition").
		WithArgs(1, "Test Text", 1, 2, time.Now().Unix()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	result, err := suite.dbStore.CreateRecognition(context.Background(), recognition)
	assert.Equal(suite.T(), recognition, result)
	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())

	assert.Nil(suite.T(), err)
}

func (suite *RecognitionHi5TestSuite) TestCreateRecognitionFailure() {
	recognition := Recognition{
		CoreValueID: 1,
		Text:        "Test Text",
		GivenFor:    1,
		GivenBy:     2,
	}

	suite.db.Close()

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("INSERT INTO recognition").
		WithArgs(1, "Test Text", 1, 2, time.Now().Unix()).
		WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectRollback()

	result, err := suite.dbStore.CreateRecognition(context.Background(), recognition)
	assert.NotEqual(suite.T(), recognition, result)
	assert.NotNil(suite.T(), err)
}
