package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /payment
func CreatePayment(c *gin.Context) {
	var payment entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//validate
	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := entity.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payment/:userID
func GetPaymentByUserID(c *gin.Context) {
	var payment []entity.Payment
	userID := c.Param("userID")
	if err := entity.DB().Preload("User").Preload("PaymentStatus").Preload("PaymentType").Raw("SELECT * FROM payments WHERE user_id = ?", userID).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payment/edit/:paymentID
func GetPaymentByPaymentID(c *gin.Context) {
	var payment entity.Payment
	paymentID := c.Param("paymentID")
	if err := entity.DB().Preload("User").Preload("PaymentStatus").Preload("PaymentType").Raw("SELECT * FROM payments WHERE id = ?", paymentID).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// DELETE /payment/:paymentID
func DeletePaymentByPaymentID(c *gin.Context) {
	paymentID := c.Param("paymentID")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", paymentID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentID})
}

// PATCH /payment
func UpdatePayment(c *gin.Context) {
	var payment entity.Payment
	var result entity.Payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", payment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}
	if err := entity.DB().Model(&result).Select("Note", "MoneySlip").Updates(entity.Payment{Note:payment.Note, MoneySlip:payment.MoneySlip}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}
