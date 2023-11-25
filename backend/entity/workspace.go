package entity

import (
	"time"

	"gorm.io/gorm"
)

type Workspace struct {
	gorm.Model
	WorkspaceName 		string 	`gorm:"uniqueIndex"`
	Description 		string
	Image 				string
	WorkspaceCreatedDate time.Time
	
	//fk
	TeamID 			*uint
	Team   			Team 			`gorm:"foreignKey:TeamID"`
	
	WorkspaceStatusID *uint
	WorkspaceStatus	WorkspaceStatus `gorm:"foreignKey:WorkspaceStatusID"`
	
	//give fk
	Projects 		[]Project 		`gorm:"foreignKey:WorkspaceID"`

}

	