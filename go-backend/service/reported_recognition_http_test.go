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

type ReportedRecognitionHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *ReportedRecognitionHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionSuccess() {
	now := time.Now().Unix()
	suite.dbMock.On("CreateReportedRecognition", mock.Anything, mock.Anything, mock.Anything).Return(db.ReportedRecognition{
		ID:                 1,
		RecognitionID:      int64(1),
		TypeOfReporting:    "fraud",
		ReasonForReporting: "Reason Test",
		ReportedBy:         int64(1),
		ReportedAt:         now,
	}, nil)

	body := `{
		"mark_as": "fraud",
		"reason": "Reason Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)
	expectedBody := fmt.Sprintf(`{"data":{"id":1,"recognition_id":1,"mark_as":"fraud","reason":"Reason Test","reported_by":1,"reported_at":%v}}`, now)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), expectedBody, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionWhenInvalidJSONFormat() {
	body := `{
		"mark_as": "fraud"
		"reason": "Reason Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Invalid json request body"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionWhenEmptyReportedRecognitionType() {
	body := `{
		"mark_as": "",
		"reason": "Reason Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-reported-recognition","message":"Invalid reported recognition data","fields":{"mark_as":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionWhenInvalidReportedRecognitionType() {
	body := `{
		"mark_as": "XYZ",
		"reason": "Reason Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-reported-recognition","message":"Invalid reported recognition data","fields":{"mark_as":"Invalid reported recognition type"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionWhenEmptyReasonForReport() {
	body := `{
		"mark_as": "fraud",
		"reason": ""
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-reported-recognition","message":"Invalid reported recognition data","fields":{"reason":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *ReportedRecognitionHandlerTestSuite) TestCreateReportedRecognitionWhenDBFailure() {
	suite.dbMock.On("CreateReportedRecognition", mock.Anything, mock.Anything, mock.Anything).Return(db.ReportedRecognition{}, errors.New("error creating reported recognition"))

	body := `{
		"mark_as": "fraud",
		"reason": "Reason Test"
	}`

	recorder := makeHTTPCallWithJWTMiddleware(
		http.MethodPost,
		"/recognitions/{recognition_id:[0-9]+}/report",
		"/recognitions/1/report",
		body,
		createReportedRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}
