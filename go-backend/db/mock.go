package db

import (
	"context"

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
