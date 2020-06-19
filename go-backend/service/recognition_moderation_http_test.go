package service

import (
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"joshsoftware/peerly/db"
)

type RecognitionModerationHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *RecognitionModerationHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *RecognitionModerationHandlerTestSuite) TestCreateRecognitionModerationSuccess() {
	now := time.Now().Unix()
	isInappropriate := false
	suite.dbMock.On("CreateRecognitionModeration", mock.Anything, mock.Anything, mock.Anything).Return(db.RecognitionModeration{
		ID:               1,
		RecognitionID:    int64(1),
		IsInappropriate:  &isInappropriate,
		ModeratorComment: "Comment Test",
		ModeratedBy:      int64(1),
		ModeratedAt:      now,
	}, nil)

	body := `{
		"is_inappropriate": false,
		"comment": "Comment Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/review",
		"/recognitions/1/review",
		body,
		createRecognitionModerationHandler(Dependencies{Store: suite.dbMock}),
	)
	expectedBody := fmt.Sprintf(`{"data":{"id":1,"recognition_id":1,"is_inappropriate":false,"comment":"Comment Test","moderated_by":1,"moderated_at":%v}}`, now)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), expectedBody, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionModerationHandlerTestSuite) TestCreateRecognitionModerationWhenInvalidJSONFormat() {
	body := `{
		"is_inappropriate": false
		"comment": "Comment Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/review",
		"/recognitions/1/review",
		body,
		createRecognitionModerationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Invalid json request body"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionModerationHandlerTestSuite) TestCreateRecognitionModerationWhenEmptyIsInappropriate() {
	body := `{
		"comment": "Comment Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/review",
		"/recognitions/1/review",
		body,
		createRecognitionModerationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-recognition-moderation","message":"Invalid recognition moderation data","fields":{"is_inappropriate":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionModerationHandlerTestSuite) TestCreateRecognitionModerationWhenDBFailure() {
	suite.dbMock.On("CreateRecognitionModeration", mock.Anything, mock.Anything, mock.Anything).Return(db.RecognitionModeration{}, errors.New("error creating reported recognition"))

	body := `{
		"is_inappropriate": false,
		"reason": "Comment Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/review",
		"/recognitions/1/review",
		body,
		createRecognitionModerationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}
