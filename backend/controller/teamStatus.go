package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// GET /teamstatus/:id
func GetTeamStatus(c *gin.Context) {
	var team_status entity.TeamStatus
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM team_statuses WHERE id = ?", id).First(&team_status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": team_status})
}

// GET /teamstatuses
func ListTeamStatuses(c *gin.Context) {
	var team_statuses []entity.TeamStatus
	if err := entity.DB().Raw("SELECT * FROM team_statuses").Find(&team_statuses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": team_statuses})
}
