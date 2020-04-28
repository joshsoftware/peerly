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
	CreateCoreValue(context.Context, int64, CoreValue) (CoreValue, error)
	DeleteCoreValue(context.Context, int64, int64) error
	UpdateCoreValue(context.Context, int64, int64, CoreValue) (CoreValue, error)
}
