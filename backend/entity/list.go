package entity

import (
	"time"

	"gorm.io/gorm"
)

type List struct {
	gorm.Model
	ListName        string `gorm:"uniqueIndex" valid:"required~Please fill ListName"`
	ListDescription string `valid:"required~Please fill description"`
	Process         float32 
	ListCrateDate   time.Time
	ProjectID       *uint
	Project         Project `gorm:"foreignKey:ProjectID"`
	Cards           []Card  `gorm:"foreignKey:ListID"`
}

// Validate validates the List struct using the validate package.

