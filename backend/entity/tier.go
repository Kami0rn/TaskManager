package entity

import "gorm.io/gorm"

type Tier struct {	
	gorm.Model
	TierName	 string 
	Price 		 float32
	
	Users []User `gorm:"foreignKey:TierID"`
}