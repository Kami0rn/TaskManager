package auth

import (
	"fmt"
	"github.com/Kami0rn/TaskManager/entity"
	"os"
	"time"

	// "go/token"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var hmacSampleSecret []byte

// Binding from JSON
type RegisterBody struct {
	Username    string `json:"UserName" binding:"required"`
	Password    string `json:"Password" binding:"required"`
	Fullname    string `json:"FullName" binding:"required"`
	Email       string `json:"Email" binding:"required"`
	PhoneNumber int    `json:"PhoneNumber"`
	Bio         string `json:"Bio"`
	ProfilePic  string `json:"ProfilePic"`
	TierID      *uint
}

func Register(c *gin.Context) {
	var json RegisterBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Check user Exist
	var userExist entity.User
	db := entity.DB()
	db.Where("username = ?", json.Username).First(&userExist)
	if userExist.ID > 0 {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User already exists"})
		return
	}

	var tierID uint
	if json.TierID == nil {
		tierID = 1            // Assign default value 1 if TierID is not provided
		json.TierID = &tierID // Assign the address of tierID to the TierID pointer
	}
	//create user
	encryptedPassword, _ := bcrypt.GenerateFromPassword([]byte(json.Password), 10)
	user := entity.User{
		UserName:    json.Username,
		Password:    string(encryptedPassword),
		FullName:    json.Fullname,
		Email:       json.Email,
		PhoneNumber: json.PhoneNumber,
		Bio:         json.Bio,
		ProfilePic:  json.ProfilePic,
		TierID:      json.TierID, // Set the TierID here
	}
	db.Create(&user)
	if user.ID > 0 {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "User Registered",
			"userId":  user.ID})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"status":  "error",
			"message": "User Unregistered"})
	}
}

type LoginBody struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	db := entity.DB()
	var json LoginBody
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var userExist entity.User
	db.Where("user_name = ?", json.Username).First(&userExist)
	if userExist.ID == 0 {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User does not exists"})
		return
	}
	err := bcrypt.CompareHashAndPassword([]byte(userExist.Password), []byte(json.Password))
	if err == nil {
		hmacSampleSecret := []byte(os.Getenv("JWT_SECRET_KEY"))

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"userId": userExist.ID,
			"exp":    time.Now().Add(time.Minute * 7).Unix(),
		})
		tokenString, err := token.SignedString(hmacSampleSecret)
		fmt.Println(tokenString, err)

		c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Login Success", "token": tokenString})
	} else {
		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "Login failed"})
	}
}
