package service

import (
	"errors"
	"joshsoftware/peerly/db"
	"net/http"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

var testRecognitionHi5 = db.RecognitionHi5{
	ID:            1,
	RecognitionID: 1,
	Comment:       "Test Comment",
	GivenBy:       1,
}

type RecognitionHi5HandlerTestSuite struct {
	suite.Suite
	dbMock *db.DBMockStore
}

func (suite *RecognitionHi5HandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *RecognitionHi5HandlerTestSuite) TestCreateRecognitionHi5Success() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, testRecognitionHi5, testRecognitionHi5.RecognitionID).Return(nil)
	suite.dbMock.On("GetUser", mock.Anything, testRecognitionHi5.GivenBy).Return(
		db.User{
			ID:              testRecognitionHi5.GivenBy,
			OrgID:           1,
			Name:            "test2",
			Email:           "test@gmail.com",
			DisplayName:     "test",
			ProfileImageURL: "test.jpg",
			RoleID:          10,
			Hi5QuotaBalance: 5,
		}, nil)

	body := `{"id": 1, "recognition_id": 1, "comment": "Test Comment", "given_by": 1}`

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
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("Error creating recognition Hi5"))
	suite.dbMock.On("GetUser", mock.Anything, testRecognitionHi5.GivenBy).Return(
		db.User{
			ID:              testRecognitionHi5.GivenBy,
			OrgID:           1,
			Name:            "test2",
			Email:           "test@gmail.com",
			DisplayName:     "test",
			ProfileImageURL: "test.jpg",
			RoleID:          10,
			Hi5QuotaBalance: 0,
		}, nil)

	body := `{"id": 1, "recognition_id": 1, "comment": "Test Comment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	// assert.Equal(suite.T(), `{"error":{"code":"insufficient_hi5_quota_balance","message":"Insufficient Hi5 quota balance.","fields":null}}`, recorder.Body.String())
	assert.NotEqual(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertNotCalled(suite.T(), "CreateRecognitionHi5", mock.Anything, testRecognitionHi5, testRecognitionHi5.RecognitionID)
	suite.dbMock.AssertCalled(suite.T(), "GetUser", mock.Anything, testRecognitionHi5.GivenBy)
}

func (suite *RecognitionHi5HandlerTestSuite) TestRecognitionHi5DBFailure() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, testRecognitionHi5, testRecognitionHi5.RecognitionID).Return(errors.New("Error in creating recognition hi5"))
	suite.dbMock.On("GetUser", mock.Anything, testRecognitionHi5.GivenBy).Return(
		db.User{
			ID:              testRecognitionHi5.GivenBy,
			OrgID:           1,
			Name:            "test2",
			Email:           "test@gmail.com",
			DisplayName:     "test",
			ProfileImageURL: "test.jpg",
			RoleID:          10,
			Hi5QuotaBalance: 5,
		}, nil)

	body := `{"id": 1, "recognition_id": 1, "comment": "Test Comment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}
