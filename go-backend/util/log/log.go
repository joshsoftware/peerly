package log

import (
	l "github.com/sirupsen/logrus"
)

// Error - prints out an error
func Error(appError error, msg string, triggeringError error) {
	l.WithFields(l.Fields{"appError": appError, "message": msg}).Error(triggeringError)
}

// Warn - for warnings
func Warn(appError error, msg string, triggeringError error) {
	l.WithFields(l.Fields{"appError": appError, "message": msg}).Warn(triggeringError)
}

// Fatal - will print out the error info and exit the program
func Fatal(appError error, msg string, triggeringError error) {
	l.WithFields(l.Fields{"appError": appError, "message": msg}).Fatal(triggeringError)
}

// Info - prints out basic information
func Info(msg string) {
	l.WithFields(l.Fields{"info": msg}).Info(msg)
}
