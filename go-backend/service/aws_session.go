package service

import (
	"context"
	"joshsoftware/peerly/config"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	logger "github.com/sirupsen/logrus"
)

// S3URLData returned s3_signed url result
type S3URLData struct {
	S3SignedURL string `json:"s3_signed_url"`
}

func getS3SignedURL(ctx context.Context, bucketName string) (signedURL S3URLData, err error) {
	// Initialize a session in AWS_REGION that the SDK will use to load
	// credentials from the shared credentials file ~/.aws/credentials.
	session, err := session.NewSession(&aws.Config{
		Region: aws.String(config.ReadEnvString("AWS_REGION"))},
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Failed to create session")
		return
	}
	// Create S3 service client
	serviceClient := s3.New(session)
	req, _ := serviceClient.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(config.ReadEnvString("AWS_SECRET_KEY")),
	})
	signedURL.S3SignedURL, err = req.Presign(15 * time.Minute)

	if err != nil {
		logger.WithField("err", err.Error()).Error("Failed to sign request")
		return
	}
	return
}
