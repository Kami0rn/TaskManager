package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /comment
func CreateComment(c *gin.Context) {
	var comment entity.Comment

	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//validate
	if _, err := govalidator.ValidateStruct(comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comment})
}

// GET /comment/:cardID
func GetCommentByCardID(c *gin.Context) {
	var comment []entity.Comment
	cardID := c.Param("cardID")
	if err := entity.DB().Preload("User").Preload("Card").Raw("SELECT * FROM comments WHERE card_id = ?", cardID).Find(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comment})
}

// GET /comment/edit/:commentID
func GetCommentByCommentID(c *gin.Context) {
	var comment entity.Comment
	commentID := c.Param("commentID")
	if err := entity.DB().Preload("User").Preload("Card").Raw("SELECT * FROM comments WHERE id = ?", commentID).Find(&comment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comment})
}

// DELETE /comment/:commentID
func DeleteCommentByCommentID(c *gin.Context) {
	commentID := c.Param("commentID")
	if tx := entity.DB().Exec("DELETE FROM comments WHERE id = ?", commentID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": commentID})
}

// PATCH /comment
func UpdateComment(c *gin.Context) {
	var comment entity.Comment
	var result entity.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", comment.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "comment not found"})
		return
	}
	if err := entity.DB().Model(&result).Select("CommentText", "EditDatetime").Updates(entity.Comment{CommentText:comment.CommentText, EditDatetime:comment.EditDatetime}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": comment})
}
