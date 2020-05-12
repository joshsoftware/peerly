package db

import (
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"context"
)

type RecognitionHi5TestSuite struct {
	suite.Suite
}

func (suite *RecognitionHi5TestSuite) TestRecognitionsSuccess() {
 	recognitionHi5 := RecognitionHi5{
		RecognitionId: 1,
		Comment: "Test Comment",
		GivenBy: 1,
	}
	err := dbStore.CreateRecognitionHi5(context.Background(), recognitionHi5, recognitionHi5.RecognitionId, 2)

	assert.Nil(suite.T(), err)
}
