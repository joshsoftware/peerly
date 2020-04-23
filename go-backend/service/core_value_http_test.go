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

func (suite *CoreValueHandlerTestSuite) TestListSubCoreValuesSuccess() {
	var parentID int64
	parentID = 1
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST PARENT",
			Description:       "Description TEST PARENT",
			ParentCoreValueID: nil,
		},
		nil,
	)
	suite.dbMock.On("ListSubCoreValues", mock.Anything, mock.Anything, mock.Anything).Return(
		[]db.CoreValue{
			db.CoreValue{
				ID:                2,
				OrgID:             1,
				CoreValueText:     "TEST",
				Description:       "Description TEST",
				ParentCoreValueID: &parentID,
			},
			db.CoreValue{
				ID:                3,
				OrgID:             1,
				CoreValueText:     "TEST 1",
				Description:       "Description TEST 1",
				ParentCoreValueID: &parentID,
			},
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{core_value_id:[0-9]+}/sub_core_values",
		"/organisations/1/core_values/1/sub_core_values",
		"",
		listSubCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":2,"org_id":1,"core_value_text":"TEST","description":"Description TEST","parent_core_value_id":1},{"id":3,"org_id":1,"core_value_text":"TEST 1","description":"Description TEST 1","parent_core_value_id":1}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestListSubCoreValueWhenInvalidParentID() {
	var parentID int64
	parentID = 2
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: &parentID,
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id}/core_values/{core_value_id}/sub_core_values",
		"/organisations/1/core_values/1/sub_core_values",
		"",
		listSubCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestListSubCoreValueWhenParentCoreValueIDNotPresent() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{},
		errors.New("Error while getting parent core value"),
	)

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id}/core_values/{core_value_id}/sub_core_values",
		"/organisations/1/core_values/1/sub_core_values",
		"",
		listSubCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestListSubCoreValuesWhenDBFailure() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST PARENT",
			Description:       "Description TEST PARENT",
			ParentCoreValueID: nil,
		},
		nil,
	)
	suite.dbMock.On("ListSubCoreValues", mock.Anything, mock.Anything, mock.Anything).Return(
		[]db.CoreValue{},
		errors.New("Error while fetching sub core values"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{core_value_id:[0-9]+}/sub_core_values",
		"/organisations/1/core_values/1/sub_core_values",
		"",
		listSubCoreValuesHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestGetCoreValueSuccess() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: nil,
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
	assert.Equal(suite.T(), `{"id":1,"org_id":1,"core_value_text":"TEST","description":"Description TEST","parent_core_value_id":null}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestGetCoreValueSuccessWhenGetSubCoreValue() {
	var parentID int64
	parentID = 1
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                2,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: &parentID,
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		"",
		getCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":2,"org_id":1,"core_value_text":"TEST","description":"Description TEST","parent_core_value_id":1}`, recorder.Body.String())
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
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	body := `{
		"core_value_text": "Mentoring",
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
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateSubCoreValueSuccess() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: nil,
		},
		nil,
	)
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateSubCoreValueWhenParentCoreValueNotPresent() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{},
		errors.New("error fetching core value"),
	)

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateSubCoreValueWhenInvalidParentCoreValue() {
	var parentID int64
	parentID = 2
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                2,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: &parentID,
		},
		nil,
	)

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 2
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenDBFailure() {
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("error creating core value"))

	body := `{
		"core_value_text": "Mentoring",
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
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateCoreValueWhenInvalidJSONFormat() {
	body := `{
		"core_value_text": "Mentoring"
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
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestCreateSubCoreValueWhenDBFailure() {
	suite.dbMock.On("GetCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(
		db.CoreValue{
			ID:                1,
			OrgID:             1,
			CoreValueText:     "TEST",
			Description:       "Description TEST",
			ParentCoreValueID: nil,
		},
		nil,
	)
	suite.dbMock.On("CreateCoreValue", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("error creating core value"))

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPost,
		"/organisations/{organisation_id:[0-9]+}/core_values",
		"/organisations/1/core_values",
		body,
		createCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueSuccess() {
	suite.dbMock.On("UpdateCoreValue", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(nil)

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueWhenDBFailure() {
	suite.dbMock.On("UpdateCoreValue", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(errors.New("error updating core value"))

	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others",
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *CoreValueHandlerTestSuite) TestUpdateCoreValueWhenInvalidJSONFormat() {
	body := `{
		"core_value_text": "Mentoring",
		"description": "Investing time and effort to mentor others"
		"parent_core_value_id": 1
	}`

	recorder := makeHTTPCall(
		http.MethodPut,
		"/organisations/{organisation_id:[0-9]+}/core_values/{id:[0-9]+}",
		"/organisations/1/core_values/2",
		body,
		updateCoreValueHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}
