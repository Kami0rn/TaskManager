package entity

import "gorm.io/gorm"

type Font struct {	
	gorm.Model
	ColorCode	 		string 
	
	//ให้ FK
	ProjectSettings		[]ProjectSetting	`gorm:"foreignKey:FontID"`
}