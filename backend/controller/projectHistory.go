package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /createProjectHistory
func CreateProjectHistory(c *gin.Context) {
	var projectHisory entity.ProjectHistory
	var project entity.Project
	var user entity.User

	// bind into projectHistory
	if err := c.ShouldBindJSON(&projectHisory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", projectHisory.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", projectHisory.ProjectID).First(&project); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "projectSetting not found"})
		return
	}


	// สร้าง Project
	newProjectHisory := entity.ProjectHistory{
		RecentlyUse: projectHisory.RecentlyUse,
		Project: project,
		User: user,
	}

	// บันทึก
	if err := entity.DB().Create(&newProjectHisory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newProjectHisory})
}

// PATCH /updateProjectHistory
func UpdateProjectHistory(c *gin.Context) {
	var projectHisory entity.ProjectHistory
	var result entity.Project

	if err := c.ShouldBindJSON(&projectHisory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// find projectHistory by id
	if tx := entity.DB().Where("id = ?", projectHisory.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "project not found"})
		return
	}

	if err := entity.DB().Save(&projectHisory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": projectHisory})
}

// GET /getRecentProjectUserID/:id
func ListRecentProjectByUserID(c *gin.Context) {
	var recentProject []entity.Project
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT p.* FROM projects p INNER JOIN project_histories h ON p.id = h.project_id WHERE p.deleted_at is NULL AND p.project_status_id = 1 AND h.user_id = ?", id).Find(&recentProject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": recentProject})
}