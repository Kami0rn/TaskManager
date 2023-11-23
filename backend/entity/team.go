package entity

import "gorm.io/gorm"

type Team struct {

	gorm.Model

	TeamName string `gorm:"uniqueIndex"`

	UserID *uint
	User   User

	Workspace []Workspace `gorm:"foreignKey:TeamID"`
}

	