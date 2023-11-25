package entity

import (
	//"time"

	"gorm.io/gorm"
)

type Deadline struct {	
	gorm.Model
	DeadlineName	 		string 
	Description	 			string 

	//FK 
	CalendarID	*uint
	Calendar	Calendar 	`gorm:"foreignKey:CalendarID"`
	
	CardID		*uint 
	Card 		Card 		`gorm:"foreignKey:CardID"`

	
	
}