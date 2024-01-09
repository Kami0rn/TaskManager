package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Kami0rn/TaskManager/controller"

	"github.com/Kami0rn/TaskManager/entity"
)

const PORT = "8084"

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// UserRoutes

	r.GET("/users", controller.ListUsers)

	r.GET("/user/:id", controller.GetUser)

	r.GET("/user/hash/:hashed_password", controller.GetUserByHash)

	r.POST("/users", controller.CreateUser)

	r.PATCH("/users", controller.UpdateUser)

	r.DELETE("/users/:id", controller.DeleteUser)

	r.GET("/roles", controller.ListRoles)

	r.GET("/role/:id", controller.GetRole)

	r.GET("/teamstatuses", controller.ListTeamStatuses)

	r.GET("/teamstatus/:id", controller.GetTeamStatus)

	r.POST("/teams", controller.CreateTeam)

	r.PATCH("/teams", controller.UpdateTeam)

	r.GET("/teams", controller.ListTeams)

	r.GET("/teammates", controller.ListTeammates)

	r.GET("/teammates/team/:id", controller.GetUserFromTeamID)

	r.GET("/teammate/:id", controller.GetTeammate)

	r.POST("/teammates", controller.CreateTeammate)

	r.POST("/leaders", controller.CreateLeader)

	r.Run("localhost: " + PORT)

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
