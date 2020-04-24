package service

import (
	"errors"
	"joshsoftware/peerly/db"
	"net/http"
	_"net/http/httptest"
	_"strings"
	_ "testing"
	"time"
	_"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
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

	testValue := "January 28, 2015"
  testForm := "January 2, 2006"
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
		"",
		listOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	// TODO: can we also assert the error messages
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganization() {

	suite.dbMock.On("CreateOrganization", mock.Anything, mock.Anything).Return(nil)

	body:=`{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":"2015-01-28T00:00:00Z","hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}


// func (suite *OrganizationHandlerTestSuite) Tes