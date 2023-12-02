package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model
	UserName 		string `gorm:"uniqueIndex"`
	Password 		string 
	HashedPassword 	string
	FullName 		string 
	Email 			string `gorm:"uniqueIndex;"`
	PhoneNumber 	int 
	Bio				string
	ProfilePic		string
	//fk
	TierID 	*uint
	Tier  	Tier 					`gorm:"foreignKey:TierID"`
	
	UserStatusID 	*uint
	UserStatus  	UserStatus 		`gorm:"foreignKey:UserStatusID"`
	
	//give fk
	Payments 		[]Payment 		 `gorm:"foreignKey:UserID"`
	ProjectHistorys []ProjectHistory `gorm:"foreignKey:UserID"`
	Comments 		[]Comment 		 `gorm:"foreignKey:UserID"`
	Teammates 		[]Teammate 		 `gorm:"foreignKey:UserID"`

} 