package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	CreateRecognition(context.Context, Recognition) error
	ShowRecognition(context.Context, string) (Recognition, error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
