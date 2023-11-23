package entity

import "gorm.io/gorm"

type Comment struct {	
	gorm.Model
	CommentText	 	string 

	//FK not 100%
	UserID			*uint
	//User	User 	`gorm:"foreignKey:UserID"`

	CardID 	*uint 
	Card	Card 	`gorm:"foreignKey:CardID"`
}