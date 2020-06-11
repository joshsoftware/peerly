package service

import (
	"encoding/json"
	"errors"
	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"joshsoftware/peerly/db"
	"log"
	"net/http"
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

func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(UsersHandlerTestSuite))
	suite.Run(t, new(OrganizationHandlerTestSuite))
	suite.Run(t, new(RecognitionsHandlerTestSuite))
}

func (suite *UsersHandlerTestSuite) TestListUsersSuccess() {
	// Start by declaring a fakeUser of type db.User, then have faker shove fake data into it
	fakeUser := db.User{}
	faker.FakeData(&fakeUser)

	// Declare an array of db.User and append the fakeUser onto it for use on the dbMock
	fakeUsers := []db.User{}
	fakeUsers = append(fakeUsers, fakeUser)

	// When calling ListUsers with any args, always return that fakeUsers array and no error
	suite.dbMock.On("ListUsers", mock.Anything).Return(fakeUsers, nil)

	recorder := makeHTTPCall(
		http.MethodGet,
		"/users",
		"/users",
		"",
		listUsersHandler(Dependencies{Store: suite.dbMock}),
	)

	var users []db.User
	err := json.Unmarshal(recorder.Body.Bytes(), &users)
	if err != nil {
		log.Fatal("Error converting HTTP body from listUsersHandler into User object in json.Unmarshal")
	}

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.NotNil(suite.T(), users[0].ID)
	suite.dbMock.AssertExpectations(suite.T())
}

// func (suite *UsersHandlerTestSuite) TestGetUserByEmailSuccess() {
// 	fakeUser := db.User{}
// 	faker.FakeData(&fakeUser)
// 	suite.dbMock.On("GetUserByEmail", mock.Anything).Return(fakeUser, nil)
// 	recorder := makeHTTPCall(
// 		http.MethodGet,
// 		"users/{email}",
// 		("/users/" + fakeUser.Email),
// 		"",
// 		getUserByEmailHandler(Dependencies{Store: suite.dbMock}),
// 	)

// 	var org db.Organization
// 	err := json.Unmarshal(recorder.Body.Bytes(), &org)
// 	if err != nil {
// 		log.Fatal("Error in json.Unmarshal on TestGetUserByEmailSuccess (email: " + org.)
// 	}
// }

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
		Name:            "test2",
		Email:           "test@gmail.com",
		DisplayName:     "test user",
		ProfileImageURL: "test.jpg",
		RoleID:          10,
		Hi5QuotaBalance: 5,
	}, nil)

	body := `{"org_id":1,"full_name":"test2","email":"test@gmail.com","display_name":"test user","profile_image_url":"test.jpg","role_id":10,"hi5_quota_balance":5}`

	recorder := makeHTTPCall(http.MethodPut,
		"/users/{id:[0-9]+}",
		"/users/1",
		body,
		updateUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"full_name":"test2","org_id":1,"email":"test@gmail.com","display_name":"test user","profile_image_url":"test.jpg","role_id":10,"hi5_quota_balance":5,"soft_delete_by":{"Int64":0,"Valid":false},"soft_delete_on":{"Time":"0001-01-01T00:00:00Z","Valid":false},"created_at":"0001-01-01T00:00:00Z"}`, recorder.Body.String())
	suite.dbMock.AssertExpectations(suite.T())
}

func (suite *UsersHandlerTestSuite) TestUpdateUserDbFailure() {
	suite.dbMock.On("UpdateUser", mock.Anything, mock.Anything, mock.Anything).Return(db.User{}, errors.New("Error while updating user"))

	body := `{"org_id":1,"full_name":"test2", "email":"test@gmail.com", "display_name": "test user", "profile_image_url": "test.jpg", "role_id": 10, "hi5_quota_balance": 5}`

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
			Name:            "test2",
			Email:           "test@gmail.com",
			DisplayName:     "test",
			ProfileImageURL: "test.jpg",
			RoleID:          10,
			Hi5QuotaBalance: 5,
		}, nil,
	)

	recorder := makeHTTPCall(http.MethodGet,
		"/users/{id:[0-9]+}",
		"/users/1",
		"",
		getUserHandler(Dependencies{Store: suite.dbMock}),
	)

	assert.Equal(suite.T(), http.StatusOK, recorder.Code)
	assert.Equal(suite.T(), `{"id":1,"full_name":"test2","org_id":1,"email":"test@gmail.com","display_name":"test","profile_image_url":"test.jpg","role_id":10,"hi5_quota_balance":5,"soft_delete_by":{"Int64":0,"Valid":false},"soft_delete_on":{"Time":"0001-01-01T00:00:00Z","Valid":false},"created_at":"0001-01-01T00:00:00Z"}`, recorder.Body.String())

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
