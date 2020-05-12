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
type UsersHandlerTestSuite struct {
	suite.Suite

	dbMock *db.DBMockStore
}

func (suite *UsersHandlerTestSuite) SetupTest() {
	suite.dbMock = &db.DBMockStore{}
}


func (suite *UsersHandlerTestSuite) TestListUsersSuccess() {
	suite.dbMock.On("ListUsers", mock.Anything).Return(
		[]db.User{
			db.User{
				ID:              1,
				OrgID:           1,
				FirstName:       "test1",
				LastName:        "test2",
				Email:           "test@gmail.com",
				DisplayName:     "test",
				ProfileImage:    "test.jpg",
				SoftDelete:      false,
				RoleID:          10,
				Hi5QuotaBalance: 5,
				SoftDeleteBy:    2,
				SoftDeleteAt:    1588073442241},
		},
		nil,
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/users",
		"/users",
		"",
		listUsersHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `[{"id":1,"org_id":1,"first_name":"test1","last_name":"test2","email":"test@gmail.com","display_name":"test","profile_image":"test.jpg","soft_delete":false,"role_id":10,"hi5_quota_balance":5,"soft_delete_by":2,"soft_delete_at":1588073442241}]`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestListUsersWhenDBFailure() {
	suite.dbMock.On("ListUsers", mock.Anything).Return(
		[]db.User{},
		errors.New("error fetching user records"),
	)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/users",
		"/users",
		"",
		listUsersHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestUpdateUserSuccess() {

	suite.dbMock.On("UpdateUser", mock.Anything, mock.Anything, mock.Anything).Return(db.User{
		ID:              1,
		OrgID:           1,
		FirstName:       "test1",
		LastName:        "test2",
		Email:           "test@gmail.com",
		DisplayName:     "test user",
		ProfileImage:    "test.jpg",
		SoftDelete:      false,
		RoleID:          10,
		Hi5QuotaBalance: 5,
		SoftDeleteBy:    2,
		SoftDeleteAt:    1588073442241,
	}, nil)

	body := `{"org_id":1,"first_name":"test1","last_name":"test2","email":"test@gmail.com","display_name":"test user","profile_image":"test.jpg","soft_delete":false,"role_id":10,"hi5_quota_balance":5,"soft_delete_by":2,"soft_delete_at":1588073442241}`

	recorder := makeHTTPCall(http.MethodPut,
		"/users/{id:[0-9]+}",
		"/users/1",
		body,
		updateUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"org_id":1,"first_name":"test1","last_name":"test2","email":"test@gmail.com","display_name":"test user","profile_image":"test.jpg","soft_delete":false,"role_id":10,"hi5_quota_balance":5,"soft_delete_by":2,"soft_delete_at":1588073442241}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestUpdateUserDbFailure() {
	suite.dbMock.On("UpdateUser", mock.Anything, mock.Anything, mock.Anything).Return(db.User{}, errors.New("Error while updating user"))

	body := `{"org_id":1,"first_name":"test1", "last_name":"test2", "email":"test@gmail.com", "display_name": "test user", "profile_image": "test.jpg", "soft_delete": false, "role_id": 10, "hi5_quota_balance": 5, "soft_delete_by": 2, "soft_delete_at": 1588073442241}`

	recorder := makeHTTPCall(http.MethodPut,
		"/users/{id:[0-9]+}",
		"/users/1",
		body,
		updateUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestGetUserSuccess() {

	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(
		db.User{
			ID:              1,
			OrgID:           1,
			FirstName:       "test1",
			LastName:        "test2",
			Email:           "test@gmail.com",
			DisplayName:     "test",
			ProfileImage:    "test.jpg",
			SoftDelete:      false,
			RoleID:          10,
			Hi5QuotaBalance: 5,
			SoftDeleteBy:    2,
			SoftDeleteAt:    1588073442241,
		}, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/users/{id:[0-9]+}",
		"/users/1",
		"",
		getUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"org_id":1,"first_name":"test1","last_name":"test2","email":"test@gmail.com","display_name":"test","profile_image":"test.jpg","soft_delete":false,"role_id":10,"hi5_quota_balance":5,"soft_delete_by":2,"soft_delete_at":1588073442241}`, recorder.Body.String())

	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestGetUserDbFailure() {

	suite.dbMock.On("GetUser", mock.Anything, mock.Anything).Return(
		db.User{}, errors.New("Error in fetching data"),
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/users/{id:[0-9]+}",
		"/users/1",
		"",
		getUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusInternalServerError, recorder.Code)

	suite.dbMock.AssertExpectations(suite.T())
}
