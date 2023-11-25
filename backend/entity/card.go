package entity

import (
	"time"

	"gorm.io/gorm"
)

type Card struct {	
	gorm.Model
	CardName	 		string 
	CardDescription	 	string 
	CreateCard			time.Time

	//FK 
	ListID			*uint
	List			List 		`gorm:"foreignKey:ListID"`

	CardStatusID	*uint 
	CardStatus 		CardStatus 	`gorm:"foreignKey:CardStatusID"`

	//give FK
	Comments		[]Comment	`gorm:"foreignKey:CardID"`
	Deadlines		[]Deadline	`gorm:"foreignKey:CardID"`
	
}