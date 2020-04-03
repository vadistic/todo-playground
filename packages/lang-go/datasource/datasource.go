package datasource

import (
	"todo-lang-go/datasource/model"
	"todo-lang-go/logger"

	"github.com/jinzhu/gorm"
	"github.com/labstack/gommon/log"
	_ "github.com/mattn/go-sqlite3"
)

func CreateDatasource() *gorm.DB {
	db, err := gorm.Open("sqlite3", ":memory:")

	// logging
	logger := logger.CreateLogger("database")

	db.LogMode(true)
	db.SetLogger(gormLogger{logger})

	if err != nil {
		logger.Fatal("cannot open db", err)
	}

	if err := db.AutoMigrate(&model.Task{}).Error; err != nil {
		logger.Fatal("cannot migrate\n", err)
	} else {
		logger.Info("migrated\n")
	}

	return db
}

type gormLogger struct {
	instance *log.Logger
}

func (l gormLogger) Print(values ...interface{}) {
	query := values[3]
	l.instance.Debug("query\n", query)
}
