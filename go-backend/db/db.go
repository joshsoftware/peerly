package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) error
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
	CreateRecognition(context.Context, Recognition) error
	ShowRecognition(context.Context, string) (Recognition, error)
	ListRecognitions(context.Context) ([]Recognition, error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
