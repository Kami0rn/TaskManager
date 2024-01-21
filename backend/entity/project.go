package entity

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	ProjectName        string    `gorm:"uniqueIndex" valid:"required~ProjectName is required, stringlength(3|50)~ProjectName is not in range(3|50), matches(^[a-zA-Z0-9_]+$)~ProjectName must not contain special characters"`
	ProjectCreatedDate time.Time `valid:"required~ProjectCreateDate is required, isNotFuture~ProjectCreateDate is not the current time"`
	ProjectProgress    float32   `gorm:"default:0" valid:"inRangre0To100~ProjectProgress is not in range 0 - 100"`
	ProjectDetail      string    `valid:"stringlength(0|100)~ProjectDetail is longer than 100 characters"`

	//fk
	WorkspaceID *uint
	Workspace   Workspace `gorm:"foreignKey:WorkspaceID"`

	ProjectSettingID *uint          `gorm:"default:1"`
	ProjectSetting   ProjectSetting `gorm:"foreignKey:ProjectSettingID"`

	ProjectStatusID *uint         `gorm:"default:1"`
	ProjectStatus   ProjectStatus `gorm:"foreignKey:ProjectStatusID"`
	//give fk

	Calendars       []Calendar       `gorm:"foreignKey:ProjectID"`
	Lists           []List           `gorm:"foreignKey:ProjectID"`
	ProjectHistorys []ProjectHistory `gorm:"foreignKey:ProjectID"`
}
