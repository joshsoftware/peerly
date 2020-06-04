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

	// Core values
	ListCoreValues(context.Context, int64) ([]CoreValue, error)
	GetCoreValue(context.Context, int64, int64) (CoreValue, error)
	CreateCoreValue(context.Context, int64, CoreValue) (CoreValue, error)
	DeleteCoreValue(context.Context, int64, int64) error
	UpdateCoreValue(context.Context, int64, int64, CoreValue) (CoreValue, error)

	//Reported Recognition
	CreateReportedRecognition(context.Context, int64, ReportedRecognition) (ReportedRecognition, error)

	//Recognition Moderation
	CreateRecognitionModeration(context.Context, int64, RecognitionModeration) (RecognitionModeration, error)
}
