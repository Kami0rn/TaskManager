package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {	
	gorm.Model
	PaymentDate		time.Time    `valid:"required~PaymentDate is required"`
	TotalPrice 		int64		 `valid:"required~TotalPrice is required,numeric~TotalPrice must be greater than 0"`
	Note 			string		 `valid:"stringlength(0|500)~Noteไม่ควรเกิน 500 ตัวอักษร"`
	MoneySlip		string		 `valid:"required~โปรดกรุณาใส่รูปสลิป"`
	//FK
	UserID 			*uint	
	User   			User 			`gorm:"foreignKey:UserID"`

	PaymentStatusID *uint
	PaymentStatus   PaymentStatus 	`gorm:"foreignKey:PaymentStatusID"`
	
	PaymentTypeID 	*uint			 `valid:"required~โปรดกรุณาเลือกธนาคาร"`
	PaymentType   	PaymentType 	`gorm:"foreignKey:PaymentTypeID"`

}