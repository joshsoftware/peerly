package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error

	// Core values
	ListCoreValues(context.Context, int64) ([]CoreValue, error)
	GetCoreValue(context.Context, int64, int64) (CoreValue, error)
	CreateCoreValue(ctx context.Context, organisationID int64, coreValue CoreValue) (coreValueID string, err error)
	DeleteCoreValue(ctx context.Context, organizationID, coreValueID int64) (err error)
}
