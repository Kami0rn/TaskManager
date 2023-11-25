package entity

import "gorm.io/gorm"

type CardStatus struct {	
	gorm.Model
	CardStatus	string

	//give FK
	Cards 	[]Card 	`gorm:"foreignKey:CardStatusID"`
}