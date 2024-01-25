package entity

import (
	"time"

	"gorm.io/gorm"
)

type Deadline struct {	
	gorm.Model
	DeadlineName	 		string  `valid:"required~Please fill Deadline"`
	Description	 			string `valid:"required~Please fill DeadlineDescription"`
	StartDate	 	time.Time 
	EndDate			time.Time

	//FK 
	CalendarID	*uint
	Calendar	Calendar 	`gorm:"foreignKey:CalendarID" valid:"-"`
	
	CardID		*uint 
	Card 		Card 		`gorm:"foreignKey:CardID" valid:"-"`

	
	
}