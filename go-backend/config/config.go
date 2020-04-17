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
)

func Load() {
	viper.SetDefault("APP_NAME", "app")
	viper.SetDefault("APP_PORT", "8002")

	viper.SetConfigName("application")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./")
	viper.AddConfigPath("./..")
	viper.AddConfigPath("./../..")
	viper.ReadInConfig()
	viper.AutomaticEnv()
}

func AppName() string {
	if appName == "" {
		appName = ReadEnvString("APP_NAME")
	}
	return appName
}

func AppPort() int {
	if appPort == 0 {
		appPort = ReadEnvInt("APP_PORT")
	}
	return appPort
}

func ReadEnvInt(key string) int {
	checkIfSet(key)
	v, err := strconv.Atoi(viper.GetString(key))
	if err != nil {
		panic(fmt.Sprintf("key %s is not a valid integer", key))
	}
	return v
}

func ReadEnvString(key string) string {
	checkIfSet(key)
	return viper.GetString(key)
}

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
