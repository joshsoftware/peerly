package service

import (
	_"errors"
	"joshsoftware/peerly/db"
	"net/http"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type RecognitionHi5HandlerTestSuite struct{
	suite.Suite
	dbMock *db.DBMockStore
}

func (suite *RecognitionHi5HandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *RecognitionHi5HandlerTestSuite) TestCreateRecognitionHi5Success() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	suite.dbMock.On("CheckHi5QuotaBalance", mock.Anything).Return(map[string]db.ErrorResponse{}, true)
	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(db.User{}, nil,)
	suite.dbMock.On("UpdateUser", mock.Anything, mock.Anything, mock.Anything).Return(db.User{}, nil)

	body := `{"comment": "testComment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionHi5HandlerTestSuite) TestCreateRecognitionHi5Failure() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(db.User{}, nil,)
	suite.dbMock.On("UpdateUser", mock.Anything, mock.Anything, mock.Anything).Return(db.User{}, nil)
	suite.dbMock.On("CheckHi5QuotaBalance", mock.Anything).Return(map[string]db.ErrorResponse{
		"error": db.ErrorResponse{
				  Code: "insufficient_hi5_quota_balance",
					Message: "Insufficient Hi5 quota balance.",
					Fields: nil,
				},
	}, false)

	body := `{"comment": "testComment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertNotCalled(suite.T(), "CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything)
	suite.dbMock.AssertNotCalled(suite.T(), "GetUser", mock.Anything, mock.Anything)
	suite.dbMock.AssertNotCalled(suite.T(), "UpdateUser", mock.Anything, mock.Anything, mock.Anything)
	suite.dbMock.AssertCalled(suite.T(), "CheckHi5QuotaBalance", mock.Anything)
}