package entity

import "gorm.io/gorm"

type Card struct {	
	gorm.Model
	CardName	 		string 
	CardDescription	 	string 

	//FK not 100%
	ListID	*uint
	//List	List `gorm:"foreignKey:ListID"`
	
	//ให้ FK
	Comment		[]Comment	`gorm:"foreignKey:CardID"`
}