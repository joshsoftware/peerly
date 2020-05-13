package db

import (
	"context"
)

// Storer - an interface we use to expose methods that do stuff to the underlying database
type Storer interface {
	// Users
	ListUsers(context.Context) ([]User, error)
	CreateNewUser(context.Context, User) (User, error)
	GetUserByEmail(context.Context, string) (User, error)
	GetUserByID(context.Context, int) (User, error)

	// Blacklisted Tokens
	CleanBlacklistedTokens() error
	CreateUserBlacklistedToken(context.Context, UserBlacklistedToken) error

	// Organizations
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) error
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
	GetOrganizationByDomainName(context.Context, string) (Organization, error)

	// Roles
	GetRoleByID(context.Context, int) (Role, error)
	GetRoleByName(context.Context, string) (Role, error)
}
