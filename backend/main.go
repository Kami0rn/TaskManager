package main

import (
	"github.com/gin-gonic/gin"

	// "github.com/Kami0rn/TaskManager/controller"

	"github.com/Kami0rn/TaskManager/entity"

	"github.com/Kami0rn/TaskManager/middleware"

	Authcontroller "github.com/Kami0rn/TaskManager/controller/auth"

	Controller "github.com/Kami0rn/TaskManager/controller"
	// Usercontroller "github.com/Kami0rn/TaskManager/controller"
)

const PORT = "8081"

func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/register", Authcontroller.Register)

	r.POST("/login", Authcontroller.Login)

	authorized := r.Group("/users", middleware.JWTAuthen())

	authorized.GET("/readall", Controller.ReadAll)
	authorized.GET("/profile", Controller.Profile)

	authorized.POST("/createProjects", Controller.CreateProject)
	authorized.GET("/getProject/:id", Controller.GetProject)
	authorized.GET("/listProjects", Controller.ListProject)

	authorized.GET("/projectGetListsFromID/:projectId", Controller.GetListsFromID)
	authorized.POST("/createList/:projectId", Controller.CreateList)
	authorized.DELETE("/deleteListFromID/:ListId", Controller.DeleteList)
	authorized.GET("/projectGetCardsFromListID/:listID", Controller.GetCardFromListID)
	authorized.POST("/projectCreateCardFromListID/:listID", Controller.CreateCard)
	authorized.DELETE("/deleteCardFromID/:CardId", Controller.DeleteCard)

	authorized.GET("/projectGetDeadlineFromID/:carlendarId", Controller.GetdeadlineFromProjectID)
	authorized.POST("/createDeadlineFromCalendarID/:carlendarId", Controller.CreateDeadline)

	authorized.GET("/projectGetCalendarFromID/:projectID", Controller.GetCalendarFromProjectID)
	authorized.POST("/createCalendarFromProjectID/:projectId", Controller.CreateCalendar)

	r.Run("localhost: " + PORT)

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT , PATCH , DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
