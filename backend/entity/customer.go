package entity

import "gorm.io/gorm"

type Customer struct {
	
	gorm.Model

	UserName string `gorm:"uniqueIndex"`

	FirstName string 

	LastName string 

	Email string `gorm:"uniqueIndex;"`

	// Address string 

	Phone string 

	Password string 

	HashedPassword string







	//FK export

	Requets []Request `gorm:"foreignKey:CustomerID"`
	// Orders []Order `gorm:"foreignKey:CustomerID"`

	// Deliveries []Delivery `gorm:"foreignKey:CustomerID"`

	// Payments []Payment `gorm:"foreignKey:CustomerID"`



}