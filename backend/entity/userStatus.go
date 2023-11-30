package entity

import "gorm.io/gorm"

type UserStatus struct {	
	gorm.Model
	UserStatus 	string

	//give FK
	Users 	[]User	`gorm:"foreignKey:UserStatusID"`
}