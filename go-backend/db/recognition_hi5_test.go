package db

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"time"
)

type RecognitionHi5TestSuite struct {
	suite.Suite
	dbStore Storer
	db *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *RecognitionHi5TestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB() 
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *RecognitionHi5TestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *RecognitionHi5TestSuite) TestCreateRecognitionHi5Success() {
 	recognitionHi5 := RecognitionHi5{
		RecognitionID: 1,
		Comment: "Test Comment",
		GivenBy: 1,
	}

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("UPDATE users").
	WithArgs(1).
	WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectExec("INSERT INTO recognition_hi5").
	WithArgs(1, "Test Comment", 1, time.Now().Unix()).
	WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectCommit()

	err := suite.dbStore.CreateRecognitionHi5(context.Background(), recognitionHi5, recognitionHi5.RecognitionID)

	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())

	assert.Nil(suite.T(), err)
}

func (suite *RecognitionHi5TestSuite) TestCreateRecognitionHi5Failure() {
	recognitionHi5 := RecognitionHi5{
		RecognitionID: 1,
		Comment: "Test Comment",
		GivenBy: 1,
	}

	suite.db.Close()

	suite.sqlmock.ExpectBegin()

	suite.sqlmock.ExpectExec("UPDATE users").
	WithArgs(1).
	WillReturnResult(sqlmock.NewResult(1, 1))

	suite.sqlmock.ExpectExec("INSERT INTO recognition_hi5").
	WithArgs(1, "Test Comment", 1, time.Now().Unix()).
	WillReturnResult(sqlmock.NewResult(1, 1))
	
	suite.sqlmock.ExpectRollback()

	err := suite.dbStore.CreateRecognitionHi5(context.Background(), recognitionHi5, recognitionHi5.RecognitionID)

	assert.NotNil(suite.T(), err)
}

