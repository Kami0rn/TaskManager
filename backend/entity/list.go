package entity

import "gorm.io/gorm"

type List struct {

	gorm.Model

	ListName string `gorm:"uniqueIndex"`

	ListDescription string

	ProjectID *uint
	Project   Project

	Card []Card `gorm:"foreignKey:ListID"`

}

	