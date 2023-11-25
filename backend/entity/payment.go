package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {	
	gorm.Model
	paymentDate		time.Time
	totalPrice 		int
	note 			string

	//FK
	UserID 			*uint	
	User   			User 			`gorm:"foreignKey:UserID"`

	PaymentStatusID *uint
	PaymentStatus   PaymentStatus 	`gorm:"foreignKey:PaymentStatusID"`
	
	PaymentTypeID 	*uint
	PaymentType   	PaymentType 	`gorm:"foreignKey:PaymentTypeID"`

}