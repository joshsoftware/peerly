package db

import (
	"context"
	"fmt"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/mock"
)

// DBMockStore - test mock struct
type DBMockStore struct {
	mock.Mock
}

// GetRoleByID - test mock
func (m *DBMockStore) GetRoleByID(ctx context.Context, id int) (role Role, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Role), args.Error(1)
}

// GetRoleByName - test mock
func (m *DBMockStore) GetRoleByName(ctx context.Context, name string) (role Role, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Role), args.Error(1)
}

// GetOrganizationByDomainName - test mock
func (m *DBMockStore) GetOrganizationByDomainName(ctx context.Context, domainName string) (organization Organization, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Organization), args.Error(1)
}

// ListUsers - test mock
func (m *DBMockStore) ListUsers(ctx context.Context) (users []User, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]User), args.Error(1)
}

// CleanBlacklistedTokens - test mock
func (m *DBMockStore) CleanBlacklistedTokens() (err error) {
	return
}

// CreateUserBlacklistedToken - Mock for testing
func (m *DBMockStore) CreateUserBlacklistedToken(ctx context.Context, blacklistedToken UserBlacklistedToken) (err error) {
	return
}

// GetUserByEmail - Mock for retrieving a user. Just return a fake user object.
func (m *DBMockStore) GetUserByEmail(ctx context.Context, email string) (user User, err error) {
	user = User{}
	err = faker.FakeData(&user)
	if err != nil {
		fmt.Printf("Error creating mock user for db.GetUserByEmail. %+v", user)
	}

	user.Email = email // Alter the user's email to be what was passed in since faker will create it at random
	return
}

// CreateNewUser - Mock for database new user creation. Just returns a fake user object
func (m *DBMockStore) CreateNewUser(ctx context.Context, u User) (newUser User, err error) {
	args := m.Called(ctx, u)
	return args.Get(0).(User), args.Error(1)
}

// GetUserByID - Mock to retrieve a user by their ID (BIGSERIAL in PostgreSQL, int in Golang)
func (m *DBMockStore) GetUserByID(ctx context.Context, id int) (user User, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(User), args.Error(1)
}

// ListOrganizations - returns a list of organization objects from the database
func (m *DBMockStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Organization), args.Error(1)
}

// ListCoreValues - returns a list of core value objects from the database
func (m *DBMockStore) ListCoreValues(ctx context.Context, organisationID int64) (coreValues []CoreValue, err error) {
	args := m.Called(ctx, organisationID)
	return args.Get(0).([]CoreValue), args.Error(1)
}

// GetCoreValue - Mock to retrieve a core value by their organization ID and core value ID
func (m *DBMockStore) GetCoreValue(ctx context.Context, organisationID, coreValueID int64) (coreValue CoreValue, err error) {
	args := m.Called(ctx, organisationID, coreValueID)
	return args.Get(0).(CoreValue), args.Error(1)
}

// CreateCoreValue - Creates core value for an organization
func (m *DBMockStore) CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (CoreValue, error) {
	args := m.Called(ctx, organisationID, coreValue)
	return args.Get(0).(CoreValue), args.Error(1)
}

// DeleteCoreValue - Deletes the core value of the organization
func (m *DBMockStore) DeleteCoreValue(ctx context.Context, organisationID, coreValueID int64) (err error) {
	args := m.Called(ctx, organisationID, coreValueID)
	return args.Error(0)
}

// UpdateCoreValue - updates core value for organization
func (m *DBMockStore) UpdateCoreValue(ctx context.Context, organisationID, coreValueID int64, coreValue CoreValue) (CoreValue, error) {
	args := m.Called(ctx, organisationID, coreValueID, coreValue)
	return args.Get(0).(CoreValue), args.Error(1)
}

// CreateOrganization - creates an organization
func (m *DBMockStore) CreateOrganization(ctx context.Context, org Organization) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org)
	return args.Get(0).(Organization), args.Error(1)
}

// GetOrganization - retrieves an organization by its id
func (m *DBMockStore) GetOrganization(ctx context.Context, id int) (organization Organization, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(Organization), args.Error(1)
}

// DeleteOrganization - removes an organization from the database given its id
// TODO: How do we want to handle deleting an org when the user's org_id is a foreign key to the org being deleted?
func (m *DBMockStore) DeleteOrganization(ctx context.Context, id int) (err error) {
	args := m.Called(ctx, id)
	return args.Error(0)
}

// UpdateOrganization - given the id and an organization object, update the database to match that organization object
func (m *DBMockStore) UpdateOrganization(ctx context.Context, org Organization, id int) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org, id)
	return args.Get(0).(Organization), args.Error(1)
}
func (m *DBMockStore) ShowRecognition(ctx context.Context, recognitionID int) (recognition Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Recognition), args.Error(1)
}

func (m *DBMockStore) CreateRecognitionHi5(ctx context.Context, recognitionHi5 RecognitionHi5, recognitionID int) (err error) {
	args := m.Called(ctx, recognitionHi5, recognitionID)
	return args.Error(0)
}

func (m *DBMockStore) GetUser(ctx context.Context, id int) (user User, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(User), args.Error(1)
}
func (m *DBMockStore) UpdateUser(ctx context.Context, user User, id int) (updatedUser User, err error) {
	args := m.Called(ctx, user, id)
	return args.Get(0).(User), args.Error(1)
}

func (m *DBMockStore) CreateRecognition(ctx context.Context, recognition Recognition) (createdRecognition Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Recognition), args.Error(1)
}

func (m *DBMockStore) ListRecognitions(ctx context.Context) (users []Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Recognition), args.Error(1)
}

func (m *DBMockStore) ListRecognitionsWithFilter(ctx context.Context, filters map[string]int) (users []Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Recognition), args.Error(1)
}

func (m *DBMockStore) CreateReportedRecognition(ctx context.Context, recognitionID int64, reportedRecognition ReportedRecognition) (resp ReportedRecognition, err error) {
	args := m.Called(ctx, recognitionID, reportedRecognition)
	return args.Get(0).(ReportedRecognition), args.Error(1)
}

func (m *DBMockStore) CreateRecognitionModeration(ctx context.Context, recognitionID int64, recognitionModeration RecognitionModeration) (resp RecognitionModeration, err error) {
	args := m.Called(ctx, recognitionID, recognitionModeration)
	return args.Get(0).(RecognitionModeration), args.Error(1)
}
