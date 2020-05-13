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

// GetRoleByID - test mock
func (m *MockStore) GetRoleByID(ctx context.Context, id int) (role Role, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Role), args.Error(1)
}

// GetRoleByName - test mock
func (m *MockStore) GetRoleByName(ctx context.Context, name string) (role Role, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Role), args.Error(1)
}

// GetOrganizationByDomainName - test mock
func (m *MockStore) GetOrganizationByDomainName(ctx context.Context, domainName string) (organization Organization, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Organization), args.Error(1)
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

	user.Email = email // Alter the user's email to be what was passed in since faker will create it at random
	return
}

// CreateNewUser - Mock for database new user creation. Just returns a fake user object
func (m *MockStore) CreateNewUser(ctx context.Context, u User) (newUser User, err error) {
	args := m.Called(ctx, u)
	return args.Get(0).(User), args.Error(1)
}

// GetUserByID - Mock to retrieve a user by their ID (BIGSERIAL in PostgreSQL, int in Golang)
func (m *MockStore) GetUserByID(ctx context.Context, id int) (user User, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(User), args.Error(1)
}

// ListOrganizations - returns a list of organization objects from the database
func (m *MockStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Organization), args.Error(1)
}

// CreateOrganization - creates an organization
func (m *MockStore) CreateOrganization(ctx context.Context, org Organization) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org)
	return args.Get(0).(Organization), args.Error(1)
}

// GetOrganization - retrieves an organization by its id
func (m *MockStore) GetOrganization(ctx context.Context, id int) (organization Organization, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(Organization), args.Error(1)
}

// DeleteOrganization - removes an organization from the database given its id
// TODO: How do we want to handle deleting an org when the user's org_id is a foreign key to the org being deleted?
func (m *MockStore) DeleteOrganization(ctx context.Context, id int) (err error) {
	args := m.Called(ctx, id)
	return args.Error(0)
}

// UpdateOrganization - given the id and an organization object, update the database to match that organization object
func (m *MockStore) UpdateOrganization(ctx context.Context, org Organization, id int) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org, id)
	return args.Get(0).(Organization), args.Error(1)
}
