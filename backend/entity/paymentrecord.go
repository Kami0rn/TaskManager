package entity

import "gorm.io/gorm"

type PaymentRecord struct {	
	gorm.Model
	IDCreditCard	int

	//FK
	UserID *uint
	// User   User `gorm:"foreignKey:UserID"`
}