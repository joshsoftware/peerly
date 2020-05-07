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

func (m *DBMockStore) CreateBadge(ctx context.Context, bdg Badge) (createdBdg Badge, err error) {
	args := m.Called(ctx, bdg)
	return args.Get(0).(Badge), args.Error(1)
}

func (m *DBMockStore) ListBadges(ctx context.Context,org_id int) (bdgs []Badge, err error) {
	args := m.Called(ctx,org_id)
	return args.Get(0).([]Badge), args.Error(1)
}

func (m *DBMockStore) ShowBadge(ctx context.Context, bdg Badge) (bdgs Badge, err error) {
	args := m.Called(ctx, bdg)
	return args.Get(0).(Badge), args.Error(1)
}

func (m *DBMockStore) UpdateBadge(ctx context.Context,bdg Badge) (bdgs Badge, err error) {
	args := m.Called(ctx,bdg)
	return args.Get(0).(Badge), args.Error(1)
}

func (m *DBMockStore) DeleteBadge(ctx context.Context,org_id int,id int) (err error) {
	args := m.Called(ctx,org_id,id)
	return args.Error(1)
}