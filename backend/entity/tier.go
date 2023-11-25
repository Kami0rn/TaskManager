package entity

import "gorm.io/gorm"

type Tier struct {	
	gorm.Model
	TierName	 string 
	Price 		 int
	
	Users []User `gorm:"foreignKey:TierID"`
}