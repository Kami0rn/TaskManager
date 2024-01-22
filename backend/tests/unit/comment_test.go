package tests

import (
	"testing"
	"time"


	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestOK_Comment_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	
	t.Run(`Payment OK`, func(t *testing.T) {
		comment := entity.Comment{
			CommentText:"test",
			EditDatetime: time.Now(),
		}
		ok, err := govalidator.ValidateStruct(comment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
func TestComment_CommentText_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Note more than 500`, func(t *testing.T) {
		comment := entity.Comment{
			CommentText: "เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก",
			EditDatetime: time.Now(),
		}
		ok, err := govalidator.ValidateStruct(comment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("CommentTextไม่ควรเกิน 500 ตัวอักษร"))
	})
}

func TestComment_CommentTextInvalid_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`โปรดกรองความคิดเห็น`, func(t *testing.T) {
		comment := entity.Comment{
			CommentText: "",
			EditDatetime: time.Now(),
		}
		ok, err := govalidator.ValidateStruct(comment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("โปรดกรองความคิดเห็น"))
	})
}