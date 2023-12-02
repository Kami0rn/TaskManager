package entity

import (
	"gorm.io/gorm"
)

type Teammate struct {
	gorm.Model
	UserID 			*uint
	User   			User 	 `gorm:"foreignKey:UserID"`
	TeamID 			*uint
	Team 			Team 	`gorm:"foreignKey:TeamID"`
	RoleID 			*uint
	Role 			Role 	`gorm:"foreignKey:RoleID"`
}