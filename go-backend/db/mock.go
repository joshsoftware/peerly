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

func (m *DBMockStore) ShowRecognition(ctx context.Context, recognitionID string) (recognition Recognition, err error) {
	args := m.Called(ctx)
	return args.Get(0).(Recognition), args.Error(1)
}

func (m *DBMockStore) CreateRecognition(ctx context.Context, recognition Recognition) (err error) {
	args := m.Called(ctx)
	return args.Error(0)
}
