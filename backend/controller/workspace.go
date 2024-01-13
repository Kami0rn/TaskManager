package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// GET /getWorkspaceTeamID/:id
func ListWorkspaceByTeamID(c *gin.Context) {
	var workspaces []entity.Workspace
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM workspaces WHERE deleted_at is NULL AND team_id = ?", id).Find(&workspaces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": workspaces})
}
