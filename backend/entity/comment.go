package entity

import (
	"time"

	"gorm.io/gorm"
)

type Comment struct {	
	gorm.Model
	CommentText	 	string 
	EditDatetime	time.Time

	UserID			*uint
	User	User 	`gorm:"foreignKey:UserID"`

	CardID 			*uint 
	Card	Card 	`gorm:"foreignKey:CardID"`
}