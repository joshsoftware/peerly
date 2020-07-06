package aws

import (
	"context"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	logger "github.com/sirupsen/logrus"
)

type S3SignedURL struct {
	S3SignedURL string `json:"s3_signed_url"`
}

func (s *awsSession) GetAWSS3SignedURL(ctx context.Context, bucketName, fileName string) (signedURL S3SignedURL, err error) {
	serviceClient := s3.New(s.awsConnection)
	req, _ := serviceClient.PutObjectRequest(&s3.PutObjectInput{
		Bucket:      aws.String(bucketName),
		Key:         aws.String(fileName),
		ContentType: aws.String("image/jpeg"),
	})
	signedURL.S3SignedURL, err = req.Presign(15 * time.Minute)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Failed to sign request")
		return
	}
	return
}
