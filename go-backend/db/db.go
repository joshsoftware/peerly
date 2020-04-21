package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
  CleanBlacklistedTokens()
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
