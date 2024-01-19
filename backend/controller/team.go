package controller

import (
	"net/http"

	"time"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

// POST /teams
func CreateTeam(c *gin.Context) {
	var team entity.Team

	// bind เข้าตัวแปร team
	if err := c.ShouldBindJSON(&team); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Team
	newTeam := entity.Team{
		TeamName:       team.TeamName,
		TeamCreateDate: time.Now(),
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
	if err := entity.DB().Preload("TeamStatus").Raw("SELECT * FROM teams WHERE id = ?", id).Find(&team).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": team})
}

// GET /teams
func ListTeams(c *gin.Context) {
	var teams []entity.Team
	if err := entity.DB().Preload("TeamStatus").Find(&teams).Error; err != nil {
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

func UpdateNumberOfTeammate(c *gin.Context) {
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

	result.NumberOfTeammate++

	if err := entity.DB().Model(&result).Update("NumberOfTeammate", result.NumberOfTeammate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": team})
}

// DELETE /team/:id
func DeleteTeam(c *gin.Context) {
    var team entity.Team
    id := c.Param("id")

    if rows := entity.DB().Clauses(clause.Returning{}).Delete(&team, id).RowsAffected; rows == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
        return
    }

    // response deleted data
    c.JSON(http.StatusOK, gin.H{"data": "cancel your team successfully"})
}
