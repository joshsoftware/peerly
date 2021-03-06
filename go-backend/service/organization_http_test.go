package service

import (
	"encoding/json"
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"joshsoftware/peerly/db"
	"net/http"
	"time"
)

var testTime, _ = time.Parse(time.RFC3339, "2006-01-02T15:04:05Z")

var testOrganization = db.Organization{
	Name:                     "test organization",
	ContactEmail:             "test@gmail.com",
	DomainName:               "www.testdomain.com",
	SubscriptionStatus:       1,
	SubscriptionValidUpto:    1588073442241,
	Hi5Limit:                 5,
	Hi5QuotaRenewalFrequency: "2",
	Timezone:                 "IST",
}

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
	suite.dbMock.On("ListOrganizations", mock.Anything).Return(
		[]db.Organization{
			db.Organization{
				ID:                       1,
				Name:                     "test organization",
				ContactEmail:             "test@gmail.com",
				DomainName:               "www.testdomain.com",
				SubscriptionStatus:       1,
				SubscriptionValidUpto:    1588073442241,
				Hi5Limit:                 5,
				Hi5QuotaRenewalFrequency: "2",
				Timezone:                 "IST",
				CreatedAt:                time.Now().UTC(),
			},
		},
		nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations",
		"/organizations",
		"",
		listOrganizationHandler(Dependencies{Store: suite.dbMock}))

	// Create a test org to compare against
	testOrgs := []db.Organization{}
	_ = json.Unmarshal(recorder.Body.Bytes(), &testOrgs)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), 1, len(testOrgs))
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
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganizationSuccess() {
	testCreateOrganization := testOrganization
	testCreateOrganization.ID = 1
	testCreateOrganization.CreatedAt = testTime
	suite.dbMock.On("CreateOrganization", mock.Anything, testOrganization).Return(testCreateOrganization, nil)

	body := `{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusCreated, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST","created_at":"2006-01-02T15:04:05Z"}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestCreateOrganizationDbFailure() {
	suite.dbMock.On("CreateOrganization", mock.Anything, testOrganization).Return(db.Organization{}, errors.New("Error while creating organization"))

	body := `{"name":"test organization","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

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

	body := `{"name":"","email":"","domain_name":"","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPost,
		"/organizations",
		"/organizations",
		body,
		createOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid_data","message":"Please provide valid organization data","fields":{"domain_name":"Please enter valid domain","email":"Please enter a valid email","name":"Can't be blank"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationSuccess() {
	testUpdateOrganization := testOrganization
	testUpdateOrganization.ID = 1
	testUpdateOrganization.Name = "test organization (updated)"
	suite.dbMock.On("UpdateOrganization", mock.Anything, testUpdateOrganization, testUpdateOrganization.ID).Return(testUpdateOrganization, nil)

	body := `{"id":1,"name":"test organization (updated)","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	// Declare test Organization object to test equality
	testOrg := db.Organization{}
	_ = json.Unmarshal(recorder.Body.Bytes(), &testOrg)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), "test organization (updated)", testOrg.Name)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationDbFailure() {
	testUpdateOrganization := testOrganization
	testUpdateOrganization.ID = 1
	testUpdateOrganization.Name = "test organization (updated)"

	suite.dbMock.On("UpdateOrganization", mock.Anything, testUpdateOrganization, testUpdateOrganization.ID).Return(db.Organization{}, errors.New("Error while updating organization"))

	body := `{"id":1,"name":"test organization (updated)","email":"test@gmail.com","domain_name":"www.testdomain.com","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestUpdateOrganizationValidationFailure() {

	body := `{"name":"name","email":"invalid email","domain_name":"invalid domain","subscription_status":1,"subscription_valid_upto":1588073442241,"hi5_limit":5,"hi5_quota_renewal_frequency":"2","timezone":"IST"}`

	recorder := makeHTTPCall(http.MethodPut,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		body,
		updateOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusBadRequest, recorder.Code)
	assert.Equal(suite.T(), `{"error":{"code":"invalid_data","message":"Please provide valid organization data","fields":{"domain_name":"Please enter valid domain","email":"Please enter a valid email"}}}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestGetOrganizationSuccess() {
	testGetOrganization := testOrganization
	testGetOrganization.ID = 1
	testGetOrganization.CreatedAt = testTime

	suite.dbMock.On("GetOrganization", mock.Anything, testGetOrganization.ID).Return(
		testGetOrganization, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/organizations/{id:[0-9]+}",
		"/organizations/1",
		"",
		getOrganizationHandler(Dependencies{Store: suite.dbMock}),
	)

	testOrg := db.Organization{}
	_ = json.Unmarshal(recorder.Body.Bytes(), &testOrg)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), 1, testOrg.ID)

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *OrganizationHandlerTestSuite) TestGetOrganizationDbFailure() {
	suite.dbMock.On("GetOrganization", mock.Anything, 1).Return(
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

	suite.dbMock.On("DeleteOrganization", mock.Anything, 1).Return(
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

	suite.dbMock.On("DeleteOrganization", mock.Anything, 1).Return(
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
