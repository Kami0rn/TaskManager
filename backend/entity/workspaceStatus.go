package entity

import "gorm.io/gorm"

type WorkspaceStatus struct {	
	gorm.Model
	WorkspaceStatus	string

	//give FK
	Workspaces 	[]Workspace 	`gorm:"foreignKey:WorkspaceStatusID"`
}