package db

import (
	"context"
)

type Storer interface {
	ListUsers(context.Context) ([]User, error)
	ListOrganizations(context.Context) ([]Organization, error)
	GetOrganization(context.Context, int) (Organization, error)
	CreateOrganization(context.Context, Organization) (Organization, error)
	DeleteOrganization(context.Context, int) (error)
	UpdateOrganization(context.Context, Organization, int) (Organization, error)
	CreateBadge(context.Context, Badge) (Badge, error)
	ListBadges(context.Context,int) ([]Badge, error)
	UpdateBadge(context.Context, Badge) (Badge, error)
	ShowBadge(context.Context, Badge) (Badge, error)
	DeleteBadge(context.Context, int,int) (error)
	//Create(context.Context, User) error
	//GetUser(context.Context) (User, error)
	//Delete(context.Context, string) error
}
