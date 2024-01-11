package entity

import (
	"time"

	"gorm.io/gorm"
)

type List struct {

	gorm.Model
	ListName 		string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อ List !"`
	ListDescription string
	Process 		float32
	ListCrateDate	time.Time
	//FK
	ProjectID 		*uint
	Project   		Project	`gorm:"foreignKey:ProjectID"`

	//give FK
	Cards 			[]Card `gorm:"foreignKey:ListID"`

}

	