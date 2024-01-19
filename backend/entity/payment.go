package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {	
	gorm.Model
	PaymentDate		time.Time    `valid:"required~Date is required"` //before_tomorrow~Date must be until today
	TotalPrice 		int64		 `valid:"required~TotalPrice is required,"`
	Note 			string		 `valid:"required~Note is required, stringlength(1|500)"`
	MoneySlip		string		 `valid:"required~MoneySlip is required"`
	//FK
	UserID 			*uint	
	User   			User 			`gorm:"foreignKey:UserID"`

	PaymentStatusID *uint
	PaymentStatus   PaymentStatus 	`gorm:"foreignKey:PaymentStatusID"`
	
	PaymentTypeID 	*uint
	PaymentType   	PaymentType 	`gorm:"foreignKey:PaymentTypeID"`

}