package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) error
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
	GetUser(context.Context, int) (User, error)
	UpdateUser(context.Context, User, int) (User, error)
	ResetHi5QuotaBalanceJob() error

	//Create(context.Context, User) errors
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
