package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// GET /tier
func GetAllTier(c *gin.Context) {
	var tier []entity.Tier
	if err := entity.DB().Raw("SELECT * FROM tiers").Find(&tier).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tier})
}
