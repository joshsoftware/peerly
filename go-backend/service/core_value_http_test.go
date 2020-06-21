package service

import (
	"errors"
	"joshsoftware/peerly/db"
	"net/http"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type CoreValueHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *CoreValueHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *CoreValueHandlerTestSuite) TestListCoreValuesSuccess() {
	suite.dbMock.On("ListCoreValues", mock.Anything, mock.Anything).Return(
		[]db.CoreValue{
			db.CoreValue{
				ID:          1,
				OrgID:       1,
				Text:        "TEST",
				Description: "Description TEST",
				ParentID:    nil,
			},
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		"",
		listCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"data":[{"id":1,"org_id":1,"text":"TEST","description":"Description TEST","parent_id":null,"thumbnail_url":null}]}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestListCoreValuesWhenDBFailure() {
	suite.dbMock.On("ListCoreValues", mock.Anything, mock.Anything).Return(
		[]db.CoreValue{},
		errors.New("error fetching core values"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		"",
		listCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestGetCoreValueSuccess() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:          1,
			OrgID:       1,
			Text:        "TEST",
			Description: "Description TEST",
			ParentID:    nil,
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/1",
		"",
		getCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"data":{"id":1,"org_id":1,"text":"TEST","description":"Description TEST","parent_id":null,"thumbnail_url":null}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestGetCoreValuesWhenDBFailure() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{},
		errors.New("Error while getting core value"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/1",
		"",
		getCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)
	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestDeleteCoreValueSuccess() {
	suite.dbMock.On("DeleteCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/1",
		"",
		deleteCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestDeleteCoreValueWhenDBFailure() {
	suite.dbMock.On("DeleteCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("Error while deleting core value"))

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/1",
		"",
		deleteCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueSuccess() {
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(db.CoreValue{
		ID:           1,
		OrgID:        1,
		Text:         "TEST",
		Description:  "Description TEST",
		ParentID:     nil,
		ThumbnailURL: nil,
	}, nil)

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others"
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), `{"data":{"id":1,"org_id":1,"text":"TEST","description":"Description TEST","parent_id":null,"thumbnail_url":null}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenParentCoreValueNotPresent() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{},
		errors.New("error fetching core value"),
	)

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-core-value","message":"Invalid core value data","fields":{"parent_id":"Invalid parent core value"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenInvalidParentCoreValue() {
	var parentID int64
	parentID = 2
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:          2,
			OrgID:       1,
			Text:        "TEST",
			Description: "Description TEST",
			ParentID:    &parentID,
		},
		nil,
	)

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_id": 2
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-core-value","message":"Invalid core value data","fields":{"parent_id":"Invalid parent core value"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenDBFailure() {
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(db.CoreValue{}, errors.New("error creating core value"))

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others"
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenInvalidJSONFormat() {
	body := `{
		"text": "Mentoring"
		"description": "Investing time and effort to mentor others"
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Invalid json request body"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueSuccess() {
	suite.dbMock.On("UpdateCoreValue", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(db.CoreValue{
		ID:          1,
		OrgID:       1,
		Text:        "TEST",
		Description: "Description TEST",
		ParentID:    nil,
	}, nil)

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others"
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"data":{"id":1,"org_id":1,"text":"TEST","description":"Description TEST","parent_id":null,"thumbnail_url":null}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueWhenDBFailure() {
	suite.dbMock.On("UpdateCoreValue", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(db.CoreValue{}, errors.New("error updating core value"))

	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others"
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Internal server error"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueWhenInvalidRequest() {
	body := `{
		"text": "",
		"description": ""
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid-core-value","message":"Invalid core value data","fields":{"description":"Can't be blank","text":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueWhenInvalidJSONFormat() {
	body := `{
		"text": "Mentoring",
		"description": "Investing time and effort to mentor others"
		"parent_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"message":"Invalid json request body"}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}
