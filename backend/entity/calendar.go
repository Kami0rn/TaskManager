package entity

import (
	"time"

	"gorm.io/gorm"
)

type Calendar struct {	
	gorm.Model
	Record	 		string 
	StartDate	 	time.Time 
	EndDate			time.Time

	//FK 
	ProjectID		*uint
	Project			Project 	`gorm:"foreignKey:ProjectID"`

	//give FK
	Deadlines		[]Deadline	`gorm:"foreignKey:CalendarID"`
	
}