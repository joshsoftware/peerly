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
type BadgeHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *BadgeHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *BadgeHandlerTestSuite) TestListBadgesSuccess() {

	suite.dbMock.On("ListBadges", mock.Anything,mock.Anything).Return(
		[]db.Badge{
			db.Badge{
				ID:               1,
				Name:             "test badges",
				OrganizationID:   999,
				Hi5CountRequired: 5,
				Hi5Frequency:     "2",
			},
		},
		nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{organization_id:[0-9]+}/badges",
		"/organizations/999/badges",
		"",
		listBadgesHandler(Dependencies{Store: suite.dbMock}))

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestListBadgesDBFailure() {
	suite.dbMock.On("ListBadges", mock.Anything,mock.Anything).Return(
		[]db.Badge{},
		errors.New("error fetching badge records"),
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{organization_id:[0-9]+}/badges",
		"/organizations/5/badges",
		"",
		listBadgesHandler(Dependencies{Store: suite.dbMock}))


	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(),"", recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestCreateBadgeSuccess() {

	suite.dbMock.On("CreateBadge", mock.Anything, mock.Anything).Return(db.Badge{
				ID:               1,
				Name:             "test badges",
				OrganizationID:   999,
				Hi5CountRequired: 5,
				Hi5Frequency:     "2",
			}, nil)

	body:=`{"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations/{organization_id:[0-9]+}/badges",
		"/organizations/999/badges",
		body,
		createBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestCreateBadgeDbFailure() {

	suite.dbMock.On("CreateBadge", mock.Anything, mock.Anything).Return(db.Badge{}, errors.New("Error while creating badge"))

	body:=`{"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPost,
	"/organizations/{organization_id:[0-9]+}/badges",
		"/organizations/999/badges",
		body,
		createBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestCreateBadgeValidationFailure() {

	body:=`{"name":"","hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations/{organization_id:[0-9]+}/badges",
		"/organizations/999/badges",
		body,
		createBadgeHandler(Dependencies{Store: suite.dbMock}),
	)
	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid_data","message":"Please provide valid badge data","fields":{"name":"Can't be blank"}}}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestUpdateBadgeSuccess() {

	suite.dbMock.On("UpdateBadge", mock.Anything, mock.Anything, mock.Anything).Return(db.Badge{
				ID:               1,
				Name:             "updated test badges",
				OrganizationID:   999,
				Hi5CountRequired: 5,
				Hi5Frequency:     "2",
			},nil)

	body:=`{"name":"updated test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		body,
		updateBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"name":"updated test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestUpdateBadgeDbFailure() {
	suite.dbMock.On("UpdateBadge", mock.Anything, mock.Anything, mock.Anything).Return(db.Badge{}, errors.New("Error while updating organization"))

	body:=`{"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		body,
		updateBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestUpdateBadgeValidationFailure() {

	body:=`{"name":"","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		body,
		updateBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid_data","message":"Please provide valid badge data","fields":{"name":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestShowBadgeSuccess() {

	suite.dbMock.On("ShowBadge", mock.Anything, mock.Anything).Return(
		db.Badge{
				ID:1,
				Name:             "test badges",
				OrganizationID:   999,
				Hi5CountRequired: 5,
				Hi5Frequency:     "2",
			}, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		"",
		showBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"name":"test badges","org_id":999,"hi5_count_required":5,"hi5_frequency":"2"}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestShowBadgeDbFailure() {

	suite.dbMock.On("ShowBadge", mock.Anything, mock.Anything).Return(
		db.Badge{}, errors.New("Error in fetching data"),
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		"",
		showBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	assert.Equal(suite.T(), "", recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestDeleteBadgeSuccess() {

	suite.dbMock.On("DeleteBadge", mock.Anything, mock.Anything,mock.Anything).Return(
		nil,
		nil,
	)

	recorder := makeHTTPCall(http.MethodDelete,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/999/badges/1",
		"",
		deleteBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *BadgeHandlerTestSuite) TestDeleteBadgeDbFailure() {

	suite.dbMock.On("DeleteBadge", mock.Anything, mock.Anything,mock.Anything).Return(
		nil,
		errors.New("Error while deleting badge"),
	)

	recorder := makeHTTPCall(http.MethodDelete,
		"/organizations/{organization_id:[0-9]+}/badges/{id:[0-9]+}",
		"/organizations/9/badges/1",
		"",
		deleteBadgeHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}
