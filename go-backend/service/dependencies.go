package service

import (
	"joshsoftware/peerly/aws"
	"joshsoftware/peerly/db"
)

// Dependencies - Stuff we need for the service package
type Dependencies struct {
	Store    db.Storer
	AWSStore aws.AWSStorer
	// define other service dependencies
}
