	package entity

	import (
		"time"

		"gorm.io/gorm"
	)

	type Card struct {	
		gorm.Model
		CardName	 		string `valid:"required~Please fill Cardname"`
		CardDescription	 	string `valid:"required~Please fill Card description"`
		CreateCard			time.Time

		//FK 
		ListID			*uint
		List			List 		`gorm:"foreignKey:ListID"  valid:"-"`

		CardStatusID	*uint 
		CardStatus 		CardStatus 	`gorm:"foreignKey:CardStatusID"  valid:"-"`

		//give FK
		Comments		[]Comment	`gorm:"foreignKey:CardID"`
		Deadlines		[]Deadline	`gorm:"foreignKey:CardID"`
		
	}