package service

import (
	"errors"
	"joshsoftware/peerly/db"
	"net/http"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type RecognitionsHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *RecognitionsHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *RecognitionsHandlerTestSuite) TestShowRecognitionSuccess() {
	suite.dbMock.On("ShowRecognition", mock.Anything, mock.Anything).Return(
		db.Recognition{ID: 1},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions/{id:[0-9]+}",
		"/organisations/11/recognitions/1",
		"",
		getRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestShowRecognitionWhenDBFailure() {
	suite.dbMock.On("ShowRecognition", mock.Anything).Return(
		db.Recognition{},
		errors.New("error fetching recognization records"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions/{id:[0-9]+}",
		"/organisations/11/recognitions/2",
		"",
		getRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestCreateRecognitionSuccess() {
	suite.dbMock.On("CreateRecognition", mock.Anything, mock.Anything).Return(db.Recognition{
		CoreValueID: 1,
		Text:        "test",
		GivenFor:    1,
		GivenBy:     2,
		GivenAt:     1588073442241,
	}, nil)
	body := `{"core_value_id":1,"text":"test","given_for":1,"given_by":2,"given_at":1588073442241}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/22/recognitions",
		body,
		createRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), `{"id":0,"core_value_id":1,"text":"test","given_for":1,"given_by":2,"given_at":1588073442241}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestCreateRecognitionWhenCoreValueIDNotPresent() {
	body := `{
		"text": "text",
		"given_for": 1,
		"given_by": 2
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/22/recognitions",
		body,
		createRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestCreateRecognitionWhenSomeKeyHasTypo() {

	body := `{
		"text": "text",
		"given_for": 1,
		"given_by": 2
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/22/recognitions",
		body,
		createRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestListRecognitionSuccess() {
	suite.dbMock.On("ListRecognitions", mock.Anything, mock.Anything).Return(
		[]db.Recognition{db.Recognition{ID: 1}},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/11/recognitions",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"core_value_id":0,"text":"","given_for":0,"given_by":0,"given_at":0}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestListRecognitionWhenDBFailure() {
	suite.dbMock.On("ListRecognitions", mock.Anything).Return(
		[]db.Recognition{},
		errors.New("error fetching recognitions records"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/11/recognitions",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestListRecognitionWithFiltersSuccess() {
	suite.dbMock.On("ListRecognitionsWithFilter", mock.Anything, mock.Anything).Return(
		[]db.Recognition{db.Recognition{ID: 1, CoreValueID: 1}},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/11/recognitions?core_value_id=1",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"core_value_id":1,"text":"","given_for":0,"given_by":0,"given_at":0}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestListRecognitionWithFiltersWhenDBFailure() {
	suite.dbMock.On("ListRecognitionsWithFilter", mock.Anything).Return(
		[]db.Recognition{},
		errors.New("error fetching recognitions records"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/11/recognitions?core_value_id=1",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}
