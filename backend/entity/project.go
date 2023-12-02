package entity

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	ProjectName 		string 	`gorm:"uniqueIndex"`
	ProjectCreatedDate	time.Time

	//fk
	WorkspaceID 		*uint
	Workspace   		Workspace 		`gorm:"foreignKey:WorkspaceID"`
	
	ProjectSettingID	*uint
	ProjectSetting		 ProjectSetting	`gorm:"foreignKey:ProjectSettingID"`
	
	ProjectStatusID		*uint
	ProjectStatus		 ProjectStatus	`gorm:"foreignKey:ProjectStatusID"`
	//give fk
	
	Calendars		[]Calendar 		 `gorm:"foreignKey:ProjectID"`
	Lists 			[]List 			 `gorm:"foreignKey:ProjectID"`
	ProjectHistorys []ProjectHistory `gorm:"foreignKey:ProjectID"`

}

	
	



	