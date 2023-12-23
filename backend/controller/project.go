package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	

)




func ProjectCreate(c *gin.Context) {
	var projectBody entity.Project
	if err := c.ShouldBindJSON(&projectBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
		// Check user Exist
	var projectExist entity.Project
	db := entity.DB()
	db.Where("id = ?", projectBody.ID).First(&projectExist)
	if projectExist.ID == 0 {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "Project has not exists"})
		return
	}
	
	var

}