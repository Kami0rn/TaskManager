package entity

import "gorm.io/gorm"

type ProjectSetting struct {	
	gorm.Model
	//fk
	BackgroundID			*uint
	Background	Background 	`gorm:"foreignKey:BackgroundID"`
	
	FontID					*uint
	Font		Font 		`gorm:"foreignKey:FontID"`
	//give fk
	Projects  []Project		`gorm:"foreignKey:ProjectSettingID"`
 	

}