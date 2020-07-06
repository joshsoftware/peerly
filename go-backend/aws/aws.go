package aws

import "context"

// AWSStorer - an interface we use to expose methods that do stuff related to AWS services
type AWSStorer interface {
	// AWS S3 service
	GetAWSS3SignedURL(context.Context, string, string) (S3SignedURL, error)
}
