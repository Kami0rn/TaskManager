package entity

import "gorm.io/gorm"

type ProjectStatus struct {	
	gorm.Model
	ProjectStatus	string

	//give FK
	Projects 	[]Project 	`gorm:"foreignKey:ProjectStatusID"`
}