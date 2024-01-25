package controller

import (
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
	"github.com/asaskevich/govalidator"
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

    // Extract calendar ID from the request
    calendarID, err := strconv.Atoi(c.Param("carlendarId"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid calendar ID"})
        return
    }

    // Bind data from JSON
    if err := c.ShouldBindJSON(&deadline); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Set the calendar ID for the new deadline
    calendarIDUint := uint(calendarID)
    deadline.CalendarID = &calendarIDUint

    // Validate deadline data using govalidator


    // Create a new deadline instance with current time for StartDate and EndDate
    newDeadline := entity.Deadline{
        DeadlineName: deadline.DeadlineName,
        Description:  deadline.Description,
        StartDate:    time.Now(),
        EndDate:      time.Now(),
        CalendarID:   &calendarIDUint,
    }

	if _, err := govalidator.ValidateStruct(newDeadline); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	
    // Save to the database
    if err := entity.DB().Create(&newDeadline).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Return the created deadline in the response
    c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Deadline created successfully", "deadline": deadline, "data": newDeadline})
}

