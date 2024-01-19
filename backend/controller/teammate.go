package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

// POST /leaders
func CreateLeader(c *gin.Context) {
	var teammate entity.Teammate
	var user entity.User
	var team entity.Team
	var role entity.Role

	// bind เข้าตัวแปร team
	if err := c.ShouldBindJSON(&teammate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", teammate.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if tx := entity.DB().Last(&team); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", teammate.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// สร้าง Teammate
	newLeader := entity.Teammate{
		User: user,
		Team: team,
		Role: role,
	}

	// บันทึก
	if err := entity.DB().Create(&newLeader).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newLeader})
}


// POST /teammates
func CreateTeammate(c *gin.Context) {
	var teammate entity.Teammate
	var user entity.User
	var team entity.Team
	var role entity.Role

	// bind เข้าตัวแปร team
	if err := c.ShouldBindJSON(&teammate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", teammate.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", teammate.TeamID).First(&team); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", teammate.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// สร้าง Teammate
	newTeammate := entity.Teammate{
		User: user,
		Team: team,
		Role: role,
	}

	// บันทึก
	if err := entity.DB().Create(&newTeammate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newTeammate})
}

// GET /teammate/:id
func GetTeammate(c *gin.Context) {
	var teammates entity.Teammate
	// id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM teammates WHERE team_id = ?", 1).Find(&teammates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teammates})
}

// GET /teammates
func ListTeammates(c *gin.Context) {
	var teammates []entity.Teammate
	if err := entity.DB().Preload("User").Preload("Team").Preload("Role").Find(&teammates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teammates})
}

func GetUserFromTeamID(c *gin.Context) {
	var teammates []entity.Teammate
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Team").Preload("Role").Raw("SELECT * FROM teammates WHERE team_id = ? AND deleted_at IS NULL", id).Find(&teammates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": teammates})
}

func DeleteSelectedTeammate(c *gin.Context) {
    var teammate entity.Teammate
	id := c.Param("id")

    if rows := entity.DB().Clauses(clause.Returning{}).Delete(&teammate, id).RowsAffected; rows == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "team not found"})
        return
    }

    // response deleted data
    c.JSON(http.StatusOK, gin.H{"data": "cancel your team successfully"})
}

