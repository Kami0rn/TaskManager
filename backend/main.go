 package main

import (
	"github.com/gin-gonic/gin"

	// "github.com/Kami0rn/TaskManager/controller"

	"github.com/Kami0rn/TaskManager/entity"

	"github.com/Kami0rn/TaskManager/middleware"

	Authcontroller "github.com/Kami0rn/TaskManager/controller/auth"

	// Usercontroller "github.com/Kami0rn/TaskManager/controller"
)

const PORT = "8080"


func main() {

	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	// UserRoutes

	// r.GET("/users", controller.ListUsers)

	// r.GET("/user/:id", controller.GetUser)

	// r.GET("/user/hash/:hashed_password", controller.GetUserByHash)

	r.POST("/register", Authcontroller.Register)

	r.POST("/login" , Authcontroller.Login)

	authorized := r.Group("/users" ,middleware.JWTAuthen())

	// authorized.GET("/readall", Usercontroller.ReadAll)
	// authorized.GET("/profile", Usercontroller.Profile)

	// r.PATCH("/users", controller.UpdateUser)

	// r.DELETE("/users/:id", controller.DeleteUser)



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