package service

import "joshsoftware/peerly/db"

type Dependencies struct {
	Store db.Storer
	// define other service dependencies
}
