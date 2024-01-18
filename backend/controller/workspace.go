package controller

import (
	"net/http"
	"time"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /workspaces
func CreateWorkspace(c *gin.Context) {
    var workspace entity.Workspace

    // bind เข้าตัวแปร workspace
    if err := c.ShouldBindJSON(&workspace); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ดึง WorkspaceStatus จากฐานข้อมูลโดยใช้ ID 
    var workspaceStatus entity.WorkspaceStatus
    if err := entity.DB().First(&workspaceStatus, workspace.WorkspaceStatusID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid WorkspaceStatus ID"})
        return
    }
    
    var team entity.Team
	if tx := entity.DB().Where("id = ?", workspace.TeamID).First(&team); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ํTeamID not found"})
		return
	}
    
    // สร้าง Workspace
    u := entity.Workspace{
        WorkspaceName:        workspace.WorkspaceName,
        Description:          workspace.Description,
        Image:                workspace.Image,
        NumberOfProject:      workspace.NumberOfProject,
        WorkspaceCreatedDate: time.Now(),
        Team: team,
        WorkspaceStatus:      workspaceStatus, 
    }
    
    // บันทึก
    if err := entity.DB().Create(&u).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": u})
}


// PATCH /workspaces/:id
func UpdateWorkspace(c *gin.Context) {
	var workspace entity.Workspace
	var result entity.Workspace

	if err := c.ShouldBindJSON(&workspace); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้าหา Workspace ด้วย id
	if tx := entity.DB().Where("id = ?", workspace.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace not found"})
		return
	}
    // บันทึก 
	if err := entity.DB().Save(&workspace).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": workspace})
}


// DELETE /workspaces/:id
func DeleteWorkspace(c *gin.Context) {
	id := c.Param("id")
	
	var workspace entity.Workspace
	if err := entity.DB().First(&workspace, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "workspace not found"})
		return
	}

	if err := entity.DB().Delete(&workspace).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "ลบ Workspace สำเร็จ"})
}


// GET /workspaces
func ListWorkspace(c *gin.Context) {
    var workspaces []entity.Workspace
    result := entity.DB().Find(&workspaces)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve workspaces"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": workspaces})
}


// GET /workspace/:id
func GetWorkspaceByID(c *gin.Context) {
	workspaceID := c.Param("id")
	var workspace entity.Workspace
	result := entity.DB().Where("id = ?", workspaceID).First(&workspace)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Workspace not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":workspace})
}


// GET /workspace_statuses/:id
func GetWorkspaceStatusByID(c *gin.Context) {
    statusID := c.Param("id")
    var status entity.WorkspaceStatus
    result := entity.DB().Where("id = ?", statusID).First(&status)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "WorkspaceStatus not found"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"data": status})
}


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

