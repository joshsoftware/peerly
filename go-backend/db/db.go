package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	ListRoles(context.Context) ([]Role, error)
	CreateRole(ctx context.Context, role Role) error
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
