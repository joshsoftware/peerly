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
				ID:                1,
				OrgID:             1,
				CoreValueText:     "TEST",
				Description:       "Description TEST",
				ParentCoreValueID: nil,
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
	assert.Equal(suite.T(), `[{"id":1,"org_id":1,"core_value_text":"TEST","description":"Description TEST","parent_core_value_id":null}]`, recorder.Body.String())
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
