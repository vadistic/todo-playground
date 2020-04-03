package model

import (
	"time"

	"github.com/google/uuid"
	"github.com/jinzhu/gorm"
)

// Base contains common columns for all tables.
type Base struct {
	ID        string `json:"id" gorm:"primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Task struct {
	ID        string `json:"id" gorm:"type:char(36);primary_key;"`
	CreatedAt time.Time
	UpdatedAt time.Time

	Name     string  `json:"name"`
	Content  *string `json:"content"`
	Finished bool    `json:"finished" gorm:"default:false"`
}

func (task *Task) BeforeCreate(scope *gorm.Scope) error {
	// needs marshaling to string!
	scope.SetColumn("ID", uuid.New().String())

	return nil
}
