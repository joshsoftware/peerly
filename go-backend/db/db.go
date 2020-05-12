package db

import (
	"context"
)

// Storer - an interface we use to expose methods that do stuff to the underlying database
type Storer interface {
	ListUsers(context.Context) ([]User, error)
<<<<<<< HEAD
	CleanBlacklistedTokens() error
	CreateUserBlacklistedToken(context.Context, UserBlacklistedToken) error
	CreateNewUser(context.Context, User) (User, error)
	GetUserByEmail(context.Context, string) (User, error)
	GetUserByID(context.Context, int64) (User, error)
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) (error)
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
}
