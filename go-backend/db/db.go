package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	CreateOrganization(context.Context, Organization) (int, error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
