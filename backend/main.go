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

const PORT = "8080"


func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())



	r.POST("/register", Authcontroller.Register)

	r.POST("/login" , Authcontroller.Login)

	authorized := r.Group("/users", middleware.JWTAuthen())

	authorized.GET("/readall", Controller.ReadAll)
	authorized.GET("/profile", Controller.Profile)

	authorized.POST("/createProjects" , Controller.CreateProject)
	authorized.GET("/getProject/:id", Controller.GetProject)
	
	





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