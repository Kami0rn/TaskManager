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

	

	//Payment
	r.GET("/payment/:userID", controller.GetPaymentByUserID)
	r.GET("/payment/edit/:paymentID", controller.GetPaymentByPaymentID)

	r.POST("/payment", controller.CreatePayment)
	
	r.PATCH("/payment",controller.UpdatePayment)

	r.DELETE("/payment/:paymentID",controller.DeletePayment)

	//tier
	r.GET("/tier",controller.GetAllTier)

	//paymentType
	r.GET("/paymentType",controller.GetAllPaymentType)	

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