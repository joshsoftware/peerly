package service

import (
	"encoding/json"
	"joshsoftware/peerly/db"
	"net/http"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type AWSs3TestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *AWSs3TestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

var testSignedURL = db.S3SignedURL{
	S3SignedURL: "https://profile.s3.ap-south-1.amazonaws.com/test.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FX253RYITCJN4AB%2F20200622%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20200622T083416Z&X-Amz-Expires=900&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=23831994bad402573f47119cd6826b8f6bd15d0c8aa9e8dc48f67c6668abac69",
}

func (suite *AWSs3TestSuite) TestGetAWSS3SignedURLSuccess() {

	suite.dbMock.On("GetAWSS3SignedURL", mock.Anything, mock.Anything, mock.Anything).Return(
		testSignedURL, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/aws/s3_signed_url}",
		"/aws/s3_signed_url?type=profile&filename=test.jpg",
		"",
		getS3SignedURLHandler(Dependencies{Store: suite.dbMock}),
	)

	testSignedURLData := db.S3SignedURL{}
	_ = json.Unmarshal(recorder.Body.Bytes(), &testSignedURLData)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *AWSs3TestSuite) TestGetOrganizationDbFailure() {
	suite.dbMock.On("GetAWSS3SignedURL", mock.Anything, mock.Anything, mock.Anything).Return(
		testSignedURL, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/aws/s3_signed_url}",
		"/aws/s3_signed_url?type=profile&filename=test.jpg",
		"",
		getS3SignedURLHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}
