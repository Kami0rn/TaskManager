package entity

import (
	"time"

	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	TeamName 		string 		`gorm:"uniqueIndex"`
	TeamCreateDate	time.Time

	UserID 			*uint
	User   			User 	 	`gorm:"foreignKey:UserID"`
	
	TeamStatusID 	*uint
	TeamStatus  	TeamStatus 	`gorm:"foreignKey:TeamStatusID"`

	Workspaces []Workspace 		`gorm:"foreignKey:TeamID"`
}

	