package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)


// POST /createProjects
func CreateProject(c *gin.Context) {
	var project entity.Project
	var workspace entity.Workspace
	var projectSetting entity.ProjectSetting
	// var projectStatus entity.ProjectStatus

	// bind into project
	if err := c.ShouldBindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", project.WorkspaceID).First(&workspace); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", project.ProjectSettingID).First(&projectSetting); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "projectSetting not found"})
		return
	}

	// if tx := entity.DB().Where("id = ?", project.ProjectStatusID).First(&projectStatus); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "projectStatus not found"})
	// 	return
	// }


	// สร้าง Project
	newProject := entity.Project{
		ProjectName: project.ProjectName,
		// ProjectCreatedDate: project.ProjectCreatedDate,
		Workspace: workspace,
		ProjectSetting: projectSetting,
		// ProjectStatus: projectStatus,
	}

	// บันทึก
	if err := entity.DB().Create(&newProject).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// นับจำนวนโปรเจกต์ใน workspace
	var updatedWorkspace entity.Workspace
	entity.DB().Preload("Projects").Find(&updatedWorkspace, newProject.WorkspaceID)
	numberOfProjects := len(updatedWorkspace.Projects)

	// อัปเดตค่า NumberOfProject ในฐานข้อมูล
	entity.DB().Model(&updatedWorkspace).UpdateColumn("number_of_project", numberOfProjects)

	c.JSON(http.StatusOK, gin.H{"data": newProject})
}

// DELETE /delProject/:id
func DeleteProject(c *gin.Context) {
	id := c.Param("id")


	if tx := entity.DB().Exec("DELETE FROM projects WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// // นับจำนวนโปรเจกต์ใน workspace
    // var updatedWorkspace entity.Workspace
    // entity.DB().Preload("Projects").Find(&updatedWorkspace, id)
    // numberOfProjects := len(updatedWorkspace.Projects)

    // // อัปเดตค่า NumberOfProject ในฐานข้อมูล
    // entity.DB().Model(&updatedWorkspace).UpdateColumn("number_of_project", numberOfProjects)

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// GET /getProject/:id
func GetProject(c *gin.Context) {
	var project entity.Project
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&project); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": project})
}