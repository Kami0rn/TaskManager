package entity

import "gorm.io/gorm"

type TeamStatus struct {	
	gorm.Model
	TeamStatus	string

	//give FK
	Teams 	[]Team 	`gorm:"foreignKey:TeamStatusID"`
}