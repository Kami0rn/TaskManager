package entity

import "gorm.io/gorm"

type Customer struct {
	
	gorm.Model

	UserName string `gorm:"uniqueIndex"`

	FullName string 


	Email string `gorm:"uniqueIndex;"`

	// Address string 



	Password string 

	HashedPassword string










}