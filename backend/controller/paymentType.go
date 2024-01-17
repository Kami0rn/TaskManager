package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// GET /paymentType
func GetAllPaymentType(c *gin.Context) {
	var paymentType []entity.PaymentType
	if err := entity.DB().Raw("SELECT * FROM payment_types").Find(&paymentType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymentType})
}
