package db

import (
	"context"
	"fmt"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/mock"
)

// MockStore - test mock struct
type MockStore struct {
	mock.Mock
}

// ListUsers - test mock
func (m *MockStore) ListUsers(ctx context.Context) (users []User, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]User), args.Error(1)
}

// CleanBlacklistedTokens - test mock
func (m *MockStore) CleanBlacklistedTokens() (err error) {
	return
}

// CreateUserBlacklistedToken - Mock for testing
func (m *MockStore) CreateUserBlacklistedToken(ctx context.Context, blacklistedToken UserBlacklistedToken) (err error) {
	return
}

// GetUserByEmail - Mock for retrieving a user. Just return a fake user object.
func (m *MockStore) GetUserByEmail(ctx context.Context, email string) (user User, err error) {
	user = User{}
	err = faker.FakeData(&user)
	if err != nil {
		fmt.Printf("Error creating mock user for db.GetUserByEmail. %+v", user)
	}

	user.Email = email // Alter the user's email to be what was passed in
	return
}

// CreateNewUser - Mock for database new user creation. Just returns a fake user object
func (m *MockStore) CreateNewUser(ctx context.Context, u User) (newUser User, err error) {
	newUser = User{}
	err = faker.FakeData(&newUser)
	if err != nil {
		fmt.Printf("Error creating mock data for db.CreateNewUser. %+v", newUser)
	}
	return
}
