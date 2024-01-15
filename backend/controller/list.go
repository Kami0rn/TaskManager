package controller

import (
	"net/http"
	"strconv"
	"time"
    "github.com/asaskevich/govalidator"
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

func CreateList(c *gin.Context) {
    var list entity.List
    var project entity.Project

    if err := c.ShouldBindJSON(&list); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    projectIdStr := c.Param("projectId")
    projectId, err := strconv.ParseUint(projectIdStr, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
        return
    }

    // Find project based on projectID
    if err := entity.DB().First(&project, projectId).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "project not found"})
        return
    }
    if _,err := govalidator.ValidateStruct(list); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // Create List
    newList := entity.List{
        ListName:        list.ListName,
        ListDescription: list.ListDescription,
        ListCrateDate:   time.Now(),
        Project:         project,
    }

    // Save to database
    if err := entity.DB().Create(&newList).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": newList})
}


func GetListsFromID(c *gin.Context) {
	projectIdStr := c.Param("projectId") // Get the projectId from the URL params
	projectId, err := strconv.ParseUint(projectIdStr, 10, 64)
	// Get the project ID from the request or wherever it's available
	if err != nil {
		// Handle error - parsing failed
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	db := entity.DB()
	var lists []entity.List

	// Fetch all lists related to the specific project ID
	db.Where("project_id = ?", projectId).Find(&lists)

	// Fetch cards for each list
	for i := range lists {
		var cards []entity.Card
		db.Where("list_id = ?", lists[i].ID).Find(&cards)
		lists[i].Cards = cards
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Lists Read Success", "lists": lists})
}


