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
		"/organisations/{orgnization_id:[0-9]+}/recognitions/{recognition_id:[0-9]+}",
		"/organisations/11/recognitions/1",
		"",
		getRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"core_values_id":0,"recognition_text":"","recognition_for":0,"recognition_by":0,"recognition_on":"0001-01-01T00:00:00Z"}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestShowRecognitionWhenDBFailure() {
	suite.dbMock.On("ShowRecognition", mock.Anything).Return(
		db.Recognition{},
		errors.New("error fetching recognization records"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions/{recognition_id:[0-9]+}",
		"/organisations/11/recognitions/2",
		"",
		getRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestCreateRecognitionSuccess() {
	suite.dbMock.On("CreateRecognition", mock.Anything, mock.Anything).Return(nil)

	body := `{
		"core_values_id" : 1,
		"recognition_text": "recognition_text",
		"recognition_for": 1,
		"recognition_by": 2
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/22/recognitions",
		body,
		createRecognitionHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *RecognitionsHandlerTestSuite) TestCreateRecognitionWhenCoreValueIDNotPresent() {
	body := `{
		"recognition_text": "recognition_text",
		"recognition_for": 1,
		"recognition_by": 2
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
		"core_values_id1" : 1,
		"recognition_text": "recognition_text",
		"recognition_for": 1,
		"recognition_by": 2
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
	assert.Equal(suite.T(), `[{"id":1,"core_values_id":0,"recognition_text":"","recognition_for":0,"recognition_by":0,"recognition_on":"0001-01-01T00:00:00Z"}]`, recorder.Body.String())
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
		[]db.Recognition{db.Recognition{ID: 1, CoreValuesID: 1}},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{orgnization_id:[0-9]+}/recognitions",
		"/organisations/11/recognitions?core_values_id=1",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"core_values_id":1,"recognition_text":"","recognition_for":0,"recognition_by":0,"recognition_on":"0001-01-01T00:00:00Z"}]`, recorder.Body.String())
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
		"/organisations/11/recognitions?core_values_id=1",
		"",
		listRecognitionsHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}
