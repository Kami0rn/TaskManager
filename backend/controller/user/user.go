package user

import (
	"github.com/Kami0rn/TaskManager/orm"

	// "go/token"
	"github.com/gin-gonic/gin"

	"net/http"
)

func ReadAll(c *gin.Context) {
	var users []orm.User
	orm.Db.Find(&users)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User read success", "users": users})

}

func Profile(c *gin.Context)  {
	userId := c.MustGet("userId").(float64)
	var user orm.User
	orm.Db.First(&user, userId)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User Read Success", "user": user})
}