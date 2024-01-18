package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /teams
func CreateTeam(c *gin.Context) {
	var team entity.Team
	var team_status entity.TeamStatus

	// bind เข้าตัวแปร team
	if err := c.ShouldBindJSON(&team); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", team.TeamStatusID).First(&team_status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team_status not found"})
		return
	}

	// สร้าง Team
	newTeam := entity.Team{
		TeamName:       team.TeamName,
		TeamCreateDate: team.TeamCreateDate,
		TeamStatus:     team_status,
	}

	// บันทึก
	if err := entity.DB().Create(&newTeam).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": newTeam})

}

// GET /team/:id
func GetTeam(c *gin.Context) {
	var team entity.Team
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teams WHERE id = ?", id).Find(&team).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": team})
}

// GET /teams
func ListTeams(c *gin.Context) {
	var teams []entity.Team
	if err := entity.DB().Raw("SELECT * FROM teams").Find(&teams).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teams})
}

// PATCH /teams
func UpdateTeam(c *gin.Context) {
	var team entity.Team
	var result entity.Team

	if err := c.ShouldBindJSON(&team); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา team ด้วย id
	if tx := entity.DB().Where("id = ?", team.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
		return
	}

	if err := entity.DB().Model(&result).Update("TeamStatusID", team.TeamStatusID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": team})
}