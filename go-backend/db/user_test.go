package db

import (
	"testing"

	"github.com/bxcodec/faker/v3"
	"github.com/stretchr/testify/assert"
)

func TestCreateNewUser(t *testing.T) {
	assert := assert.New(t)
	u := faker.FakeData(User{})
	assert.NotNil(u)
}
