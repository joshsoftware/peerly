package db

import (
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/suite"
	"testing"
	"time"
)

var (
	now        time.Time
	mockedRows *sqlmock.Rows
)

func InitMockDB() (s Storer, sqlConn *sqlx.DB, sqlmockInstance sqlmock.Sqlmock) {
	mockDB, sqlmock, err := sqlmock.New()
	if err != nil {
		logger.WithField("err:", err).Error("error initializing mock db")
		return
	}

	sqlmockInstance = sqlmock
	sqlxDB := sqlx.NewDb(mockDB, "sqlmock")

	var pgStoreConn pgStore
	pgStoreConn.db = sqlxDB

	return &pgStoreConn, sqlxDB, sqlmockInstance
}

func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(OrganizationTestSuite))
	suite.Run(t, new(RecognitionHi5TestSuite))
	suite.Run(t, new(ReportedRecognitionTestSuite))
	suite.Run(t, new(RecognitionModerationTestSuite))
}
