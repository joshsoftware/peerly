package config

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/spf13/viper"
)

var (
	appName string
	appPort int
	jwtKey  string
)

// Load - loads all the environment variables and/or params in application.yml
func Load(configFile string) {
	viper.SetDefault("APP_NAME", "app")
	viper.SetDefault("APP_PORT", "8002")

	viper.SetConfigName(configFile)
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./")
	viper.AddConfigPath("./..")
	viper.AddConfigPath("./../..")
	viper.ReadInConfig()
	viper.AutomaticEnv()
}

// AppName - returns the app name
func AppName() string {
	if appName == "" {
		appName = ReadEnvString("APP_NAME")
	}
	return appName
}

// AppPort - returns application http port
func AppPort() int {
	if appPort == 0 {
		appPort = ReadEnvInt("APP_PORT")
	}
	return appPort
}

// JwtKey - returns the JSON Web Token key
func JwtKey() []byte {
	if jwtKey == "" {
		jwtKey = ReadEnvString("JWT_SECRET")
	}
	return []byte(jwtKey)
}

// ReadEnvInt - reads an environment variable as an integer
func ReadEnvInt(key string) int {
	checkIfSet(key)
	v, err := strconv.Atoi(viper.GetString(key))
	if err != nil {
		panic(fmt.Sprintf("key %s is not a valid integer", key))
	}
	return v
}

// ReadEnvString - reads an environment variable as a string
func ReadEnvString(key string) string {
	checkIfSet(key)
	return viper.GetString(key)
}

// ReadEnvBool - reads environment variable as a boolean
func ReadEnvBool(key string) bool {
	checkIfSet(key)
	return viper.GetBool(key)
}

func checkIfSet(key string) {
	if !viper.IsSet(key) {
		err := errors.New(fmt.Sprintf("Key %s is not set", key))
		panic(err)
	}
}
