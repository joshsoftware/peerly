package log

import (
	l "github.com/sirupsen/logrus"
)

// Error - prints out an error
func Error(err error, msg string, sample string) () {
	l.WithFields(l.Fields{"error":err,"message":msg,"sample_data":sample}).Error(err)
}

// Warn - for warnings
func Warn(err error, msg string, sample string) () {
	l.WithFields(l.Fields{"error":err,"message":msg,"sample_data":sample}).Warn(err)
}

// Fatal - will print out the error info and exit the program
func Fatal(err error, msg string, sample string) () {
	l.WithFields(l.Fields{"error":err,"message":msg,"sample_data":sample}).Fatal(err)
}

// Info - prints out basic information
func Info(msg string) () {
	l.WithFields(l.Fields{"info":msg}).Info(msg)
}
