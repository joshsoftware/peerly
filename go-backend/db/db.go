package db

import (
	"context"
)

// Storer - an interface we use to expose methods that do stuff to the underlying database
type Storer interface {
	ListUsers(context.Context) ([]User, error)
	CleanBlacklistedTokens() error
	CreateUserBlacklistedToken(context.Context, UserBlacklistedToken) error
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
