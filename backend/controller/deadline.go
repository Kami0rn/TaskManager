package controller

import (
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"


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

    // Bind data from JSON
    if err := c.ShouldBindJSON(&deadline); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Extract calendar ID from the JSON data
    calendarID := deadline.CalendarID
    cardID := deadline.CardID

    if calendarID == nil || cardID == nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid calendar ID or card ID"})
        return
    }

    // Parse start_date and end_date into time.Time
    startDate := deadline.StartDate
    endDate := deadline.EndDate

    // Validate deadline data using govalidator

    // Create a new deadline instance with the provided start and end dates
    newDeadline := entity.Deadline{
        DeadlineName: deadline.DeadlineName,
        Description:  deadline.Description,
        StartDate:    startDate,
        EndDate:      endDate,
        CalendarID:   calendarID,
        CardID:       cardID,
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


func DeleteDeadline(c *gin.Context) {
	DeadlineId := c.Param("DeadlineId")
	if tx := entity.DB().Exec("DELETE FROM deadlines WHERE id = ?", DeadlineId); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "deadline not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DeadlineId,"status": "ok", "message": "Deadline delete Success"})
}







