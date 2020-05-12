package db

import (
	"joshsoftware/peerly/config"
	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/suite"
	"testing"
)
var dbStore Storer

func init() {
	config.Load("application_test")

	err := RunMigrations()
	if err!=nil {
		logger.WithField("err", err.Error()).Error("Database migration failed")
		return
	}

	store, err := Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
  dbStore = store
}

func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(OrganizationTestSuite))
	suite.Run(t, new(RecognitionHi5TestSuite))
	suite.Run(t, new(CoreValueTestSuite))
}