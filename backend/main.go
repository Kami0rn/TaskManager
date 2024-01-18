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

	// WorkspaceRoutes
	r.GET("/workspaces", controller.ListWorkspace) 
	r.GET("/workspace/:id", controller.GetWorkspaceByID) 
	r.POST("/workspaces", controller.CreateWorkspace)
	r.PATCH("/workspaces/:id", controller.UpdateWorkspace)
	r.DELETE("/workspaces/:id", controller.DeleteWorkspace)
	r.GET("/workspace_statuses/:id", controller.GetWorkspaceStatusByID)
    
	// ProjectSetting
	r.GET("/backgrounds", controller.ListBackground) 
	r.GET("/fonts", controller.ListFont)
	r.POST("/backgrounds", controller.UploadBackground)
	r.POST("/createSettings", controller.CreateSetting)
	r.PATCH("/settings/:projectId", controller.UpdateSetting)
	r.GET("/background/bySettingID/:id", controller.GetBackgroundBySettingID)
	r.GET("/font/bySettingID/:id", controller.GetFontBySettingID)

	// Team
	r.GET("/team/:id", controller.GetTeam)
	r.GET("/teams", controller.ListTeams)
	r.POST("/createProjects", controller.CreateProject)
	r.GET("/getWorkspaceTeamID/:id", controller.ListWorkspaceByTeamID)
	r.GET("/getProject/:id", controller.GetProject)
	

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