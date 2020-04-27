package service

import (
	"errors"
	"joshsoftware/peerly/db"
	"net/http"
	_"net/http/httptest"
	_"strings"
	_ "testing"
	"time"
	"fmt"
	_"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

const (
	testValue = "January 28, 2015"
	testForm = "January 2, 2006"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type OrganizationHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *OrganizationHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}

func (suite *OrganizationHandlerTestSuite) TestListOrganizationsSuccess() {
	testTime, _ := time.Parse(testForm, testValue)

	suite.dbMock.On("ListOrganizations", mock.Anything).Return(
		[]db.Organization{
			db.Organization{
				ID:1,
				Name:"test organization",
				ContactEmail: "test@gmail.com",
				DomainName: "www.testdomain.com",
				SubscriptionStatus: 1,
				SubscriptionValidUpto: testTime,
				Hi5Limit: 5,
				Hi5QuotaRenewalFrequency: "2",
				Timezone: "IST",
			},
		},
		nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations",
		"/organizations",
		"",
		listOrganizationHandler(Dependencies{Store: suite.dbMock}))

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestListOrganizationsDBFailure() {
	suite.dbMock.On("ListOrganizations", mock.Anything).Return(
		[]db.Organization{},
		errors.New("error fetching organization records"),
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations",
		"/organizations",
		"",
		listOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	// TODO: can we also assert the error messages
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganizationSuccess() {

	suite.dbMock.On("CreateOrganization", mock.Anything, mock.Anything).Return(nil)

	body:=`{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganizationDbFailure() {

	suite.dbMock.On("CreateOrganization", mock.Anything, mock.Anything).Return(errors.New("Error while creating organization"))

	body:=`{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganizationValidationFailure() {

	body:=`{"name":"","email":"","domain_name":"","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	fmt.Println(recorder.Body.String(), "validation json")

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"domain_name":["Please enter valid domain"],"email":["Please enter a valid email"],"name":["Can't be blank"]}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationSuccess() {

	suite.dbMock.On("UpdateOrganization", mock.Anything, mock.Anything, mock.Anything).Return(nil)

	body:=`{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationDbFailure() {
	suite.dbMock.On("UpdateOrganization", mock.Anything, mock.Anything, mock.Anything).Return(errors.New("Error while updating organization"))

	body:=`{"name":"test update organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusNotFound, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationValidationFailure() {

	body:=`{"name":"name","email":"invalid email","domain_name":"invalid domain","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	fmt.Println(recorder.Body.String(), "validation json")

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"domain_name":["Please enter valid domain"],"email":["Please enter a valid email"]}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestGetOrganizationSuccess() {

	testTime, _ := time.Parse(testForm, testValue)
	suite.dbMock.On("GetOrganization", mock.Anything, mock.Anything).Return(
		db.Organization{
				ID:1,
				Name:"test organization",
				ContactEmail: "test@gmail.com",
				DomainName: "www.testdomain.com",
				SubscriptionStatus: 1,
				SubscriptionValidUpto: testTime,
				Hi5Limit: 5,
				Hi5QuotaRenewalFrequency: "2",
				Timezone: "IST",
			}, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		"",
		getOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestGetOrganizationDbFailure() {

	suite.dbMock.On("GetOrganization", mock.Anything, mock.Anything).Return(
		db.Organization{}, errors.New("Error in fetching data"),
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		"",
		getOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestDeleteOrganizationSuccess() {

	suite.dbMock.On("DeleteOrganization", mock.Anything, mock.Anything).Return(
		nil,
	)

	recorder := makeHTTPCall(http.MethodDelete,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		"",
		deleteOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestDeleteOrganizationDbFailure() {

	suite.dbMock.On("DeleteOrganization", mock.Anything, mock.Anything).Return(
		errors.New("Error while deleting organization"),
	)

	recorder := makeHTTPCall(http.MethodDelete,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		"",
		deleteOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}