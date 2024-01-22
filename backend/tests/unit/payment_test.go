package tests

import (
	"testing"
	"time"


	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestOK_Payment_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	uintPaymentTypeID := uint(1)
	t.Run(`Payment OK`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(),
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",

			PaymentTypeID: &uintPaymentTypeID,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})
}
func TestPayment_DatePayment_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	uintPaymentTypeID := uint(1)
	t.Run(`PaymentDate required`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Time{},
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",

			PaymentTypeID: &uintPaymentTypeID,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PaymentDate is required"))
	})
}
func TestPayment_Note_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	uintPaymentTypeID := uint(1)
	t.Run(`Note more than 500`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), //time.Date(2002, 12, 25, 0, 0, 0, 0, time.UTC)
			TotalPrice: 1000,
			Note: "เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก เก่งมาก",
			MoneySlip: "image1",

			PaymentTypeID: &uintPaymentTypeID,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Noteไม่ควรเกิน 500 ตัวอักษร"))
	})
}
func TestPayment_TotalPrice_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	uintPaymentTypeID := uint(1)
	t.Run(`TotalPrice must be greater than 0`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), 
			TotalPrice: -100,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",

			PaymentTypeID: &uintPaymentTypeID,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TotalPrice must be greater than 0"))
	})
}

func TestPayment_MoneySlip_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	uintPaymentTypeID := uint(1)
	t.Run(`MoneySlip is empty`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), 
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "",

			PaymentTypeID: &uintPaymentTypeID,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("โปรดกรุณาใส่รูปสลิป"))
	})
}

func TestPayment_PaymentTypeID_SettingValidation(t *testing.T) {
	g := NewGomegaWithT(t)
	
	t.Run(`PaymentTypeID is empty`, func(t *testing.T) {
		payment := entity.Payment{
			PaymentDate: time.Now(), 
			TotalPrice: 1000,
			Note: "อยาก ลา ออก",
			MoneySlip: "image1",

			PaymentTypeID:nil,
		}
		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("โปรดกรุณาเลือกธนาคาร"))
	})
}