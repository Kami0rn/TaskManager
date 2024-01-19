package entity

import (
	"time"

	"gorm.io/gorm"
)

type Team struct {
	gorm.Model
	TeamName 		string 		`gorm:"uniqueIndex" valid:"required~TeamName is required, stringlength(4|15)"`
	TeamCreateDate	time.Time	`valid:"required~TeamCreateDate is required"`
	NumberOfTeammate int		`gorm:"default:1" valid:"required~NumberOfTeammate is required"`
	//fk
	TeamStatusID 	uint		`gorm:"default:1"`
	TeamStatus  	TeamStatus 	`gorm:"foreignKey:TeamStatusID"`
	//give fk
	Workspaces 		[]Workspace 	`gorm:"foreignKey:TeamID"`
	Teammates 		[]Teammate 		`gorm:"foreignKey:TeamID"`

}

	