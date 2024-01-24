package entity

import (


	"gorm.io/gorm"
)

type Calendar struct {	
	gorm.Model
	Record	 		string 


	//FK 
	ProjectID		*uint
	Project			Project 	`gorm:"foreignKey:ProjectID"`

	//give FK
	Deadlines		[]Deadline	`gorm:"foreignKey:CalendarID"`
	
}