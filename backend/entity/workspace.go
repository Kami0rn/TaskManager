package entity

import (
	"time"

	"gorm.io/gorm"
	
)

type Workspace struct {
	gorm.Model
	WorkspaceName 		string 	`gorm:"uniqueIndex" valid:"required~WorkspaceName is required"`
	Description 		string  `gorm:"type:text"`
    Image               string  `gorm:"type:longtext"`
	NumberOfProject     int
	WorkspaceCreatedDate time.Time
	
	
	//fk
	TeamID 			*uint
	Team   			Team 			`gorm:"foreignKey:TeamID"`
	
	WorkspaceStatusID *uint
	WorkspaceStatus	WorkspaceStatus `gorm:"foreignKey:WorkspaceStatusID"`
	
	//give fk
	Projects 		[]Project 		`gorm:"foreignKey:WorkspaceID"`

}

