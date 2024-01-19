package tests

import (
	"testing"
	"fmt"
	"time"


	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestOKPaymentSettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Payment OK`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(),
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
func TestPaymentDatePaymentSettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`PaymentDate required`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now().Add(time.Duration(1) * time.Hour), 
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PaymentDate is required"))
	})
}
func TestNotePaymentSettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`Note more than 500`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), //time.Date(2002, 12, 25, 0, 0, 0, 0, time.UTC)
			TotalPrice: 1000,
			Note: "เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก",
			MoneySlip: "image1",
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("Note: %s does not validate as stringlength(1|500)", payment.Note)))
	})
}
func TestTotalPricePaymentSettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`TotalPrice value less than 0`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), 
			TotalPrice: "",
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalPrice is invalid"))
	})
}