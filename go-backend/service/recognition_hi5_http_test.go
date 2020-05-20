package service

import (
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"joshsoftware/peerly/db"
	"net/http"
)

type RecognitionHi5HandlerTestSuite struct {
	suite.Suite
	dbMock *db.DBMockStore
}

func (suite *RecognitionHi5HandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *RecognitionHi5HandlerTestSuite) TestCreateRecognitionHi5Success() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(db.User{
		ID:              1,
		OrgID:           1,
		FirstName:       "test1",
		LastName:        "test2",
		Email:           "test@gmail.com",
		DisplayName:     "test",
		ProfileImage:    "test.jpg",
		SoftDelete:      false,
		RoleID:          10,
		Hi5QuotaBalance: 5,
		SoftDeleteBy:    2,
		SoftDeleteAt:    1588073442241,
	}, nil)

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
	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(db.User{
		ID:              1,
		OrgID:           1,
		FirstName:       "test1",
		LastName:        "test2",
		Email:           "test@gmail.com",
		DisplayName:     "test",
		ProfileImage:    "test.jpg",
		SoftDelete:      false,
		RoleID:          10,
		Hi5QuotaBalance: 0,
		SoftDeleteBy:    2,
		SoftDeleteAt:    1588073442241,
	}, nil)

	body := `{"comment": "testComment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), `{"error":{"code":"insufficient_hi5_quota_balance","message":"Insufficient Hi5 quota balance.","fields":null}}`, recorder.Body.String())
	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertNotCalled(suite.T(), "CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything)
	suite.dbMock.AssertCalled(suite.T(), "GetUser", mock.Anything, mock.Anything)
}

func (suite *RecognitionHi5HandlerTestSuite) TestRecognitionHi5DBFailure() {
	suite.dbMock.On("CreateRecognitionHi5", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("Error in creating recognition hi5"))
	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(db.User{
		ID:              1,
		OrgID:           1,
		FirstName:       "test1",
		LastName:        "test2",
		Email:           "test@gmail.com",
		DisplayName:     "test",
		ProfileImage:    "test.jpg",
		SoftDelete:      false,
		RoleID:          10,
		Hi5QuotaBalance: 2,
		SoftDeleteBy:    2,
		SoftDeleteAt:    1588073442241,
	}, nil)

	body := `{"comment": "testComment", "given_by": 1}`

	recorder := makeHTTPCall(http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/hi5",
		"/recognitions/1/hi5",
		body,
		createRecognitionHi5Handler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}
