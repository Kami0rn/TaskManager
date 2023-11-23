package entity

import "gorm.io/gorm"

type Project struct {

	gorm.Model

	ProjectName string `gorm:"uniqueIndex"`

	WorkspaceID *uint
	Workspace   Workspace

	ProjectSetting []ProjectSetting `gorm:"foreignKey:ProjectID"`

	// Calendar []Calendar `gorm:"foreignKey:ProjectID"`

	List []List `gorm:"foreignKey:ProjectID"`

	ProjectHistory []ProjectHistory `gorm:"foreignKey:ProjectID"`

}

	
	



	