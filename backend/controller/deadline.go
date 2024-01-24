package controller

import (
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

func GetdeadlineFromProjectID(c *gin.Context) {
	carlendarIdStr := c.Param("carlendarId") // Get the projectId from the URL params
	calendarID, err := strconv.ParseUint(carlendarIdStr, 10, 64)
	// Get the project ID from the request or wherever it's available
	if err != nil {
		// Handle error - parsing failed
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid calendar ID"})
		return
	}
	c.Set("deadlineID", uint(calendarID)) // Assuming projectId is of type uint

	db := entity.DB()
	var deadlines []entity.Deadline

	// Fetch all lists related to the specific project ID
	db.Where("calendar_id = ?", calendarID).Find(&deadlines)

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Deadline Read Success", "deadlines": deadlines})
}

func CreateDeadline(c *gin.Context) {
	var deadline entity.Deadline

	// Extract list ID from the request
	carlendarId, err := strconv.Atoi(c.Param("carlendarId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid calendar ID"})
		return
	}

	// Bind card data from JSON
	if err := c.ShouldBindJSON(&deadline); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the list ID for the new card
	calendarIDUint := uint(carlendarId)
	deadline.CalendarID = &calendarIDUint

	// Validate card data using govalidator or your preferred validation method

	// Here, you can save the new card to your database or perform any other necessary actions
	// For example, assuming you have a function to save the card:
	// savedCard, err := repository.SaveCard(&card)
	// Check for errors and handle accordingly
	newDeadline := entity.Deadline{
		DeadlineName: deadline.DeadlineName,
		Description:  deadline.Description,
		StartDate:    time.Now(),
		EndDate:      time.Now(),
		CalendarID: &calendarIDUint,
	}

	// Save to database
	if err := entity.DB().Create(&newDeadline).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// c.JSON(http.StatusOK, gin.H{"data": newCard})

	// Return the created card in the response
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Deadline created successfully", "deadline": deadline, "data": newDeadline})
}
