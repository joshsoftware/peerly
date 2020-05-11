package db

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
	"joshsoftware/peerly/config"
	logger "github.com/sirupsen/logrus"
)

type RecognitionHi5TestSuite struct {
	suite.Suite
	dbStore Storer
}

func (suite *RecognitionHi5TestSuite) SetupSuite() {
	config.Load("application_test")

	err := RunMigrations()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database migration failed")
		return
	}

	store, err := Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
	suite.dbStore = store
}

func (suite *RecognitionHi5TestSuite) TestRecognitionsSuccess() {
 	recognitionHi5 := RecognitionHi5{
		RecognitionId: 1,
		Comment: "Test Comment",
		GivenBy: 1,
	}
	err := suite.dbStore.CreateRecognitionHi5(context.Background(), recognitionHi5, recognitionHi5.RecognitionId, 2)

	assert.Nil(suite.T(), err)
}