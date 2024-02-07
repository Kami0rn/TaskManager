package controller

import (
	"net/http"
	"strconv"
	"time"
    "github.com/asaskevich/govalidator"
	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	"fmt"
)

func CreateList(c *gin.Context) {
    var list entity.List
    var project entity.Project

    // Bind data from JSON
    if err := c.ShouldBindJSON(&list); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Validate list data using govalidator
    if _, err := govalidator.ValidateStruct(list); err != nil {
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
        c.JSON(http.StatusBadRequest, gin.H{"error": "Project not found"})
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

    c.JSON(http.StatusOK, gin.H{"data": newList, "message": "List created successfully"})
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

func DeleteList(c *gin.Context) {
	ListId := c.Param("ListId")
	if tx := entity.DB().Exec("DELETE FROM lists WHERE id = ?", ListId); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ListId})
}

func UpdateList(c *gin.Context) {
	
	fmt.Println("Handling PATCH request for /users/updateList")
	var updatedList entity.List
  
	// Bind data from JSON
	if err := c.ShouldBindJSON(&updatedList); err != nil {
	  c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	  return
	}
  
	var existingList entity.List
  
	// Find the existing list based on the ID
	if tx := entity.DB().Where("id = ?", updatedList.ID).First(&existingList); tx.RowsAffected == 0 {
	  c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
	  return
	}
  
	// Merge the changes into the existing list
	// You may customize this part based on how you want to handle partial updates
	entity.DB().Model(&existingList).Updates(updatedList)
  
	c.JSON(http.StatusOK, gin.H{"data": existingList, "message": "List updated successfully", "status": "ok"})
  }
  



func GetListFromID(c *gin.Context)  {
	listIdStr := c.Param("listIDForMenu")
	listId, err := strconv.ParseUint(listIdStr, 10, 64)
	if err != nil {
		// Handle error - parsing failed
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid listIDForMenu ID"})
		return
	}
	db := entity.DB()
	var list entity.List

	result := db.Where("id = ?", listId).Find(&list)
	if result.RowsAffected == 0 {
        // List with the given ID not found
        c.JSON(http.StatusNotFound, gin.H{"error": "List not found"})
        return
    }

	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "List Read Success", "list": list})
}
