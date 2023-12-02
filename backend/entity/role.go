package entity

import "gorm.io/gorm"

type Role struct {	
	gorm.Model
	RoleName	 		string 
	//ให้ FK
	Teammates		[]Teammate	`gorm:"foreignKey:RoleID"`
}