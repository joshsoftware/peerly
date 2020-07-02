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
	GetUserByOrganization(context.Context, int, int) (User, error)
	GetUser(context.Context, int) (User, error)
	UpdateUser(context.Context, User, int) (User, error)

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

	// Recognition
	CreateRecognition(context.Context, Recognition) (Recognition, error)
	ShowRecognition(context.Context, int) (Recognition, error)
	ListRecognitions(context.Context) ([]Recognition, error)
	ListRecognitionsWithFilter(context.Context, map[string]int) ([]Recognition, error)

	// cron job to reset user's Hi5 data
	ResetHi5QuotaBalanceJob() error
	UpdateHi5QuotaRenewalFrequencyOfUsers(Organization) error

	// Roles
	GetRoleByID(context.Context, int) (Role, error)
	GetRoleByName(context.Context, string) (Role, error)

	// Core values
	ListCoreValues(context.Context, int64) ([]CoreValue, error)
	GetCoreValue(context.Context, int64, int64) (CoreValue, error)
	CreateCoreValue(context.Context, int64, CoreValue) (CoreValue, error)
	DeleteCoreValue(context.Context, int64, int64) error
	UpdateCoreValue(context.Context, int64, int64, CoreValue) (CoreValue, error)

	//RecognitionHi5
	CreateRecognitionHi5(context.Context, RecognitionHi5, int) error

	//Reported Recognition
	CreateReportedRecognition(context.Context, int64, ReportedRecognition) (ReportedRecognition, error)

	//Recognition Moderation
	CreateRecognitionModeration(context.Context, int64, RecognitionModeration) (RecognitionModeration, error)
	CreateBadge(context.Context, Badge) (Badge, error)
	ListBadges(context.Context, int) ([]Badge, error)
	UpdateBadge(context.Context, Badge) (Badge, error)
	ShowBadge(context.Context, Badge) (Badge, error)
	DeleteBadge(context.Context, int, int) error
}
