package entity

import (
	"time"

	"gorm.io/gorm"
)

type ProjectHistory struct {	
	gorm.Model
	RecentlyUse time.Time 

	//FK 
	ProjectID			*uint
	Project		Project `gorm:"foreignKey:ProjectID"`
	
	UserID				*uint
	User		User 	`gorm:"foreignKey:UserID"`
}