package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"strconv"

)




func GetListsFromID(c *gin.Context) {
	projectIdStr := c.Param("projectId") // Get the projectId from the URL params
	projectId, err := strconv.ParseUint(projectIdStr, 10, 64)
	// Get the project ID from the request or wherever it's available
	if err != nil {
		// Handle error - parsing failed
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}
	c.Set("projectId", uint(projectId)) // Assuming projectId is of type uint

	db := entity.DB()
	var lists []entity.List

	// Fetch all lists related to the specific project ID
	db.Where("project_id = ?", projectId).Find(&lists)

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Lists Read Success", "lists": lists})
}

