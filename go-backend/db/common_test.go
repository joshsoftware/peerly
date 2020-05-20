package db

import (
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/suite"
	"testing"
)

func InitMockDB() (s Storer, sqlConn *sqlx.DB, sqlmockInstance sqlmock.Sqlmock) {
	mockDB, sqlmock, err := sqlmock.New()
	if err !=nil {
		logger.WithField("error in mock init", err).Error("error occurred")
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
	suite.Run(t, new(CoreValueTestSuite))
}
