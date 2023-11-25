package entity

import "gorm.io/gorm"

type Background struct {	
	gorm.Model
	ColorCode	 		string 
	//ให้ FK
	ProjectSettings		[]ProjectSetting	`gorm:"foreignKey:BackgroundID"`
}