package db

import (
	"regexp"
)

// ErrorResponse - a struct representing a response for an error
type ErrorResponse struct {
	Code    string            `json:"code"`
	Message string            `json:"message"`
	Fields  map[string]string `json:"fields"`
}

const (
	emailRegexString  = `^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$`
	domainRegexString = `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]`
)

var emailRegex = regexp.MustCompile(emailRegexString)
var domainRegex = regexp.MustCompile(domainRegexString)
