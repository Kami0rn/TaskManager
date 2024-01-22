package entity

import (
	"time"

	"gorm.io/gorm"
)

type Comment struct {	
	gorm.Model
	CommentText	 	string 		`valid:"required~โปรดกรองความคิดเห็น,stringlength(0|500)~CommentTextไม่ควรเกิน 500 ตัวอักษร"`
	EditDatetime	time.Time

	UserID			*uint
	User	User 	`gorm:"foreignKey:UserID"`

	CardID 			*uint 
	Card	Card 	`gorm:"foreignKey:CardID"`
}