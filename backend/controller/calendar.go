package controller

import (
	"fmt"
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func GetCalendarFromProjectID(c *gin.Context) {
	projectIDStr := c.Param("projectID")
	projectID, err := strconv.ParseUint(projectIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	c.Set("projectID", uint(projectID))

	db := entity.DB()
	var calendar []entity.Calendar

	// Fetch all lists related to the specific project ID and preload the Deadline
	// Preload the Deadlines association
	db.Where("project_id = ?", projectID).Preload("Deadlines").Find(&calendar)

	if db.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": db.Error.Error()})
		return
	}

	fmt.Println("Project ID:", projectID)

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Calendar Read Success", "calendar": calendar, "ProjecID": projectID})
}

func CreateCalendar(c *gin.Context) {
	var calendar entity.Calendar

	// Extract list ID from the request
	projectId, err := strconv.Atoi(c.Param("projectId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}

	// Bind card data from JSON
	if err := c.ShouldBindJSON(&calendar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the list ID for the new card
	projectIDUint := uint(projectId)
	calendar.ProjectID = &projectIDUint

	// Validate card data using govalidator or your preferred validation method

	// Here, you can save the new card to your database or perform any other necessary actions
	// For example, assuming you have a function to save the card:
	// savedCard, err := repository.SaveCard(&card)
	// Check for errors and handle accordingly
	newCalendar := entity.Calendar{
		Record:    calendar.Record,
		ProjectID: &projectIDUint,
	}

	// Save to database
	if err := entity.DB().Create(&newCalendar).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// c.JSON(http.StatusOK, gin.H{"data": newCard})

	// Return the created card in the response
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Calendar created successfully", "calendar": calendar, "data": newCalendar})
}
