package controller

import (
	"net/http"
	"strconv"
	"time"
	// "github.com/asaskevich/govalidator"
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

func CreateCard(c *gin.Context) {
	var card entity.Card


	// Extract list ID from the request
	listID, err := strconv.Atoi(c.Param("listID"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid list ID"})
		return
	}

	// Bind card data from JSON
	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Set the list ID for the new card
	listIDUint := uint(listID)
	card.ListID = &listIDUint

	// Validate card data using govalidator or your preferred validation method


	// Here, you can save the new card to your database or perform any other necessary actions
	// For example, assuming you have a function to save the card:
	// savedCard, err := repository.SaveCard(&card)
	// Check for errors and handle accordingly
	newCard := entity.Card{
        CardName:        card.CardName,
        CardDescription: card.CardDescription,
        CreateCard:   time.Now(),
        ListID:         card.ListID,
    }

    // Save to database
	if err := entity.DB().Create(&newCard).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// c.JSON(http.StatusOK, gin.H{"data": newCard})

	// Return the created card in the response
	c.JSON(http.StatusCreated, gin.H{"message": "Card created successfully", "card": card})
}


func GetCardFromListID(c *gin.Context) {
	projectIdStr := c.Param("projectId") // Get the projectId from the URL params
	projectId, err := strconv.ParseUint(projectIdStr, 10, 64)
	// Get the project ID from the request or wherever it's available
	if err != nil {
		// Handle error - parsing failed
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid project ID"})
		return
	}
	c.Set("projectId", uint(projectId)) // Assuming projectId is of type uint

	db := entity.DB()
	var lists []entity.List

	// Fetch all lists related to the specific project ID
	db.Where("project_id = ?", projectId).Find(&lists)

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Lists Read Success", "lists": lists})
}
