package datasource

import (
	"todo-lang-go/datasource/model"

	"github.com/jinzhu/gorm"
	"github.com/labstack/gommon/log"
	_ "github.com/mattn/go-sqlite3"
)

type logger struct {
	instance *log.Logger
}

func (l logger) Print(values ...interface{}) {
	l.instance.Info("my logger\n")

	query := values[3]

	l.instance.Debug("query\n", query)
}

func Init() (*gorm.DB, error) {
	db, err := gorm.Open("sqlite3", ":memory:")

	// db logger
	dbLog := log.New("database")
	dbLog.SetHeader("[${time_rfc3339}] ${prefix} =>")
	l := logger{dbLog}
	db.LogMode(true)
	db.SetLogger(l)

	if err := db.AutoMigrate(&model.Task{}).Error; err != nil {
		dbLog.Fatal("cannot migrate")
	}

	dbLog.Info("connected & migrated")

	return db, err
}
