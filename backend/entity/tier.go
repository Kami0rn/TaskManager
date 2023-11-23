package entity

import "gorm.io/gorm"

type Tier struct {	
	gorm.Model
	TierName	 string 
}