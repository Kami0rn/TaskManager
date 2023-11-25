package entity

import "gorm.io/gorm"

type PaymentType struct {	
	gorm.Model
	PaymentType	string

	//give FK
	Payments 	[]Payment 	`gorm:"foreignKey:PaymentTypeID"`
}