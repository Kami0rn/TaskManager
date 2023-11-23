package entity

import "gorm.io/gorm"

type Workspace struct {

	gorm.Model

	WorkspaceName string `gorm:"uniqueIndex"`

	Description string

	Image string

	TeamID *uint
	Team   Team

	Project []Project `gorm:"foreignKey:WorkspaceID"`

}

	