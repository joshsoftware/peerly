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

func (m *DBMockStore) ListCoreValues(ctx context.Context, organisationID string) (coreValues []CoreValue, err error) {
	args := m.Called(ctx, organisationID)
	return args.Get(0).([]CoreValue), args.Error(1)
}

func (m *DBMockStore) GetCoreValues(ctx context.Context, organisationID, coreValueID string) (coreValue CoreValue, err error) {
	args := m.Called(ctx, organisationID, coreValueID)
	return args.Get(0).(CoreValue), args.Error(1)
}
