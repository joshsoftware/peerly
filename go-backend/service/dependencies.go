package service

import "joshsoftware/peerly/db"

// Dependencies - Stuff we need for the service package
type Dependencies struct {
	Store db.Storer
	// define other service dependencies
}
