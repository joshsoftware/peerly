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
	CreateRecognition(context.Context, Recognition) (Recognition, error)
	ShowRecognition(context.Context, int) (Recognition, error)
	ListRecognitions(context.Context) ([]Recognition, error)
	ListRecognitionsWithFilter(context.Context, map[string]int) ([]Recognition, error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
