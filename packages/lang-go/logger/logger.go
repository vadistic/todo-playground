package logger

import (
	"os"

	"github.com/labstack/gommon/log"
)

func CreateLogger(prefix string) *log.Logger {
	logger := log.New(prefix)
	// TODO: pad this!
	logger.SetHeader("[${prefix}] ${level} =>")
	logger.SetLevel(getLogLevel())

	// TODO: support global setting to log to file

	return logger
}

func getLogLevel() log.Lvl {
	level := os.Getenv("LOG_LEVEL")

	if level == "" {
		return log.INFO
	}

	switch level {
	case "OFF":
		return log.OFF
	case "INFO":
		return log.INFO
	case "WARN":
		return log.WARN
	case "ERROR":
		return log.ERROR
	case "DEBUG":
		return log.DEBUG
	default:
		return log.INFO
	}
}
