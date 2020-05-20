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

func (m *DBMockStore) ListCoreValues(ctx context.Context, organisationID int64) (coreValues []CoreValue, err error) {
	args := m.Called(ctx, organisationID)
	return args.Get(0).([]CoreValue), args.Error(1)
}

func (m *DBMockStore) GetCoreValue(ctx context.Context, organisationID, coreValueID int64) (coreValue CoreValue, err error) {
	args := m.Called(ctx, organisationID, coreValueID)
	return args.Get(0).(CoreValue), args.Error(1)
}

func (m *DBMockStore) CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (CoreValue, error) {
	args := m.Called(ctx, organisationID, coreValue)
	return args.Get(0).(CoreValue), args.Error(1)
}

func (m *DBMockStore) DeleteCoreValue(ctx context.Context, organisationID, coreValueID int64) (err error) {
	args := m.Called(ctx, organisationID, coreValueID)
	return args.Error(0)
}

func (m *DBMockStore) UpdateCoreValue(ctx context.Context, organisationID, coreValueID int64, coreValue CoreValue) (CoreValue, error) {
	args := m.Called(ctx, organisationID, coreValueID, coreValue)
	return args.Get(0).(CoreValue), args.Error(1)
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

func (m *DBMockStore) CreateReportedRecognition(ctx context.Context, recognitionID int64, reportedRecognition ReportedRecognition) (resp ReportedRecognition, err error) {
	args := m.Called(ctx, recognitionID, reportedRecognition)
	return args.Get(0).(ReportedRecognition), args.Error(1)
}
