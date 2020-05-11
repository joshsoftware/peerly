package db

import (
	"context"
	"joshsoftware/peerly/config"

	logger "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type RecognitionTestSuite struct {
	suite.Suite
	dbStore Storer
}

func (suite *RecognitionTestSuite) SetupSuite() {
	config.Load("application_test")

	err := RunMigrations()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
	}

	store, err := Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
	suite.dbStore = store
}

func (suite *RecognitionTestSuite) TestRecognitionSuccess() {

	// test create Recognition
	expectedRec := Recognition{
		CoreValueID: 1,
		Text:        "test Recognition",
		GivenFor:    10,
		GivenBy:     2,
		GivenAt:     1588073442241,
	}
	var err error
	createdRecognition, err := suite.dbStore.CreateRecognition(context.Background(), expectedRec)

	assert.Nil(suite.T(), err)

	// test get Recognition
	var recognitionData Recognition
	recognitionData, err = suite.dbStore.ShowRecognition(context.Background(), expectedRec.ID)

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), recognitionData, createdRecognition)

	// test list Recognition
	var recognitionList []Recognition

	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), recognitionList, []Recognition{createdRecognition})

	//test get Recognition with filter query
	var filters map[string]int
	filters["core_value_id"] = createdRecognition.CoreValueID
	filters["given_by"] = createdRecognition.GivenBy
	recognitionList, err = suite.dbStore.ListRecognitionsWithFilter(context.Background(), filters)
	assert.Nil(suite.T(), err)
	assert.Equal(suite.T(), recognitionList, []Recognition{createdRecognition})

}

// TODO run migrations conflicts for multiple test files
// TODO teardown function
