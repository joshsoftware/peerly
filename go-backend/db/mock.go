package db

import (
	"context"

	"github.com/stretchr/testify/mock"
)

type DBMockStore struct {
	mock.Mock
}

func (m *DBMockStore) ListUsers(ctx context.Context) (users []User, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]User), args.Error(1)
}

func (m *DBMockStore) ListOrganizations(ctx context.Context) (organizations []Organization, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Organization), args.Error(1)
}

func (m *DBMockStore) CreateOrganization(ctx context.Context, org Organization) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org)
	return args.Get(0).(Organization), args.Error(1)
}

func (m *DBMockStore) GetOrganization(ctx context.Context, id int) (organization Organization, err error) {
	args := m.Called(ctx, id)
	return args.Get(0).(Organization), args.Error(1)
}

func (m *DBMockStore) DeleteOrganization(ctx context.Context, id int) (err error) {
	args := m.Called(ctx, id)
	return args.Error(0)
}

func (m *DBMockStore) UpdateOrganization(ctx context.Context, org Organization, id int) (updatedOrg Organization, err error) {
	args := m.Called(ctx, org, id)
	return args.Get(0).(Organization), args.Error(1)
}
func (m *DBMockStore) ShowRecognition(ctx context.Context, recognitionID string) (recognition Recognition, err error) {
func (m *DBMockStore) ShowRecognition(ctx context.Context, recognitionID int) (recognition Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Recognition), args.Error(1)
}

func (m *DBMockStore) CreateRecognition(ctx context.Context, recognition Recognition) (err error) {
	args := m.Called(ctx)
	return args.Error(0)
}

func (m *DBMockStore) ListRecognitions(ctx context.Context) (users []Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Recognition), args.Error(1)
}

func (m *DBMockStore) ListRecognitionsWithFilter(ctx context.Context, filters map[string]int) (users []Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).([]Recognition), args.Error(1)
}
