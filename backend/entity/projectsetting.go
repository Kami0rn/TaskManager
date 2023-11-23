package entity

import "gorm.io/gorm"

type ProjectSetting struct {	
	gorm.Model
	//FK not 100%
	BackgroundID			*uint
	Background	Background 	`gorm:"foreignKey:BackgroundID"`
	
	FontID					*uint
	Font		Font 		`gorm:"foreignKey:BackgroundID"`

	// อย่าลืมแก้ไข Project เพิ่ม 

}