package aws

import (
	"joshsoftware/peerly/config"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/client"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	logger "github.com/sirupsen/logrus"
)

type awsSession struct {
	awsConnection client.ConfigProvider
}

var awsCon awsSession

// Init - initialize aws session and return the  aws store
func Init() (s AWSStorer, err error) {
	Session, err := session.NewSession(&aws.Config{
		Region: aws.String(config.ReadEnvString("AWS_REGION")),
		Credentials: credentials.NewStaticCredentials(
			config.ReadEnvString("AWS_ACCESS_ID"),  // id
			config.ReadEnvString("AWS_SECRET_KEY"), // secret
			""),
		LogLevel: aws.LogLevel(aws.LogDebugWithHTTPBody)},
	)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Failed to create session")
		return
	}
	awsCon.awsConnection = Session
	return &awsCon, nil
}
