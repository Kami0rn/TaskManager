package entity

import "gorm.io/gorm"

type PaymentStatus struct {	
	gorm.Model
	PaymentStatus	string

	//give FK
	Payments 	[]Payment 	`gorm:"foreignKey:PaymentStatusID"`
}