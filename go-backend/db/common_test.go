package db

import (
	"joshsoftware/peerly/config"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/suite"
	"testing"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
)

var dbStore Storer
var sqlmockvar sqlmock.Sqlmock
func init() {
	config.Load("application_test")

	err := RunMigrations()
	if err!=nil {
		logger.WithField("err", err.Error()).Error("Database migration failed")
		return
	}

	store, err := InitMock()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
	dbStore = store
}

func InitMock() (s Storer, err error) {
	mockDB, newsqlmock, err := sqlmock.New()
	sqlmockvar = sqlmock
	sqlxDB := sqlx.NewDb(mockDB,"sqlmock")
	var pgStoreConn pgStore
    pgStoreConn.db = sqlxDB

	return &pgStoreConn, nil
}

func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(OrganizationTestSuite))
// 	suite.Run(t, new(RecognitionHi5TestSuite))
// 	suite.Run(t, new(CoreValueTestSuite))
}
