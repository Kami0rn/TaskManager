package entity

import (
	"time"

	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	TeamName 		string 		`gorm:"uniqueIndex"`
	TeamCreateDate	time.Time

	TeamStatusID 	*uint
	TeamStatus  	TeamStatus 	`gorm:"foreignKey:TeamStatusID"`

	Workspaces 	[]Workspace 	`gorm:"foreignKey:TeamID"`
	Teammates 	[]Teammate 		`gorm:"foreignKey:TeammateID"`

}

	