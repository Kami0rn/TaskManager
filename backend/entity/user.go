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
	Tier  	Tier 					 `gorm:"foreignKey:TierID"`
	//give fk
	Payments 		[]Payment 		 `gorm:"foreignKey:UserID"`
	Teams 			[]Team 			 `gorm:"foreignKey:UserID"`
	ProjectHistorys []ProjectHistory `gorm:"foreignKey:UserID"`
	Comments 		[]Comment 		 `gorm:"foreignKey:UserID"`
} 