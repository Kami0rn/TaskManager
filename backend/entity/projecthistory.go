package entity

import "gorm.io/gorm"

type ProjectHistory struct {	
	gorm.Model
	
	//FK 
	ProjectID			*uint
	//Project	Project `gorm:"foreignKey:ProjectID"`
	UserID				*uint
	//User		User 	`gorm:"foreignKey:UserID"`
}