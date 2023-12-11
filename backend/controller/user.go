package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
	// "golang.org/x/crypto/bcrypt"
	// "os"
	// "github.com/golang-jwt/jwt"
	// "time"
	// "fmt"
)

// type RegisterBody struct {
// 	Username    string `json:"username" binding:"required"`
// 	Password    string `json:"password" binding:"required"`
// 	Fullname    string `json:"fullname" binding:"required"`
// 	Email       string `json:"email" binding:"required"`
// 	PhoneNumber int    `json:"phonenumber" binding:"required"`
// 	Bio         string `json:"bio"`
// 	ProfilePic  string `json:"profilePic"`
// }

// POST /users
// POST /users
// func CreateUser(c *gin.Context) {
// 	var userBody RegisterBody
// 	db := entity.DB()

// 	// Bind JSON request body to RegisterBody struct
// 	if err := c.ShouldBindJSON(&userBody); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	var userExist entity.User
// 	db.Where("username = ?", userBody.Username).First(&userExist)
// 	if userExist.ID > 0 {
// 		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User already exists"})
// 		return
// 	}

// 	// Hash the password
// 	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(userBody.Password), 10)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing the password"})
// 		return
// 	}

// 	// Create a new User entity
// 	newUser := entity.User{
// 		UserName:    userBody.Username,
// 		Password:    string(encryptedPassword),
// 		FullName:    userBody.Fullname,
// 		Email:       userBody.Email,
// 		PhoneNumber: userBody.PhoneNumber,
// 		Bio:         userBody.Bio,
// 		ProfilePic:  userBody.ProfilePic,
// 	}

// 	if err := db.Create(&newUser).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": newUser})
// }

// type LoginBody struct {
// 	Username string `json:"username" binding:"required"`
// 	Password string `json:"password" binding:"required"`
// }

// func Login(c *gin.Context) {
// 	db := entity.DB()
// 	var json LoginBody
// 	if err := c.ShouldBindJSON(&json); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	var userExist entity.User
// 	db.Where("username = ?", json.Username).First(&userExist)
// 	if userExist.ID == 0 {
// 		c.JSON(http.StatusOK, gin.H{"status": "error", "message": "User does not exists"})
// 		return
// 	}
// 	err := bcrypt.CompareHashAndPassword([]byte(userExist.Password), []byte(json.Password))
// 	if err == nil {
// 		hmacSampleSecret := []byte(os.Getenv("JWT_SECRET_KEY"))
// 		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 			"userId": userExist.ID,
// 			"exp": time.Now().Add(time.Minute * 7).Unix(),
// 		})
// 		tokenString, err := token.SignedString(hmacSampleSecret)
// 		fmt.Println(tokenString, err)

//			c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Login Success", "token": tokenString})
//		} else {
//			c.JSON(http.StatusOK, gin.H{"status": "error", "message": "Login failed"})
//		}
//	}
func ReadAll(c *gin.Context) {
	db := entity.DB()
	var users []entity.User
	db.Find(&users)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User read success", "users": users})

}

func Profile(c *gin.Context) {
	userId := c.MustGet("userId").(float64)
	db := entity.DB()
	var user entity.User
	db.First(&user, userId)
	c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "User Read Success", "user": user})
}

// GET /user/:id
// func GetUser(c *gin.Context) {
// 	var user entity.User
// 	id := c.Param("id")
// 	if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }

// // GET /users
// func ListUsers(c *gin.Context) {
// 	var users []entity.User
// 	if err := entity.DB().Raw("SELECT * FROM users").Find(&users).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": users})
// }

// // DELETE /users/:id
// func DeleteUser(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /users
// func UpdateUser(c *gin.Context) {
// 	var user entity.User
// 	var result entity.User

// 	if err := c.ShouldBindJSON(&user); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	// ค้นหา user ด้วย id
// 	if tx := entity.DB().Where("id = ?", user.ID).First(&result); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&user).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": user})
// }

// func GetUserByHash(c *gin.Context) {
//     var user entity.User
//     hashedPassword := c.Param("hashed_password")

//     // Replace this with a proper database query to retrieve the user by hashed password
//     if err := entity.DB().Where("hashed_password = ?", hashedPassword).First(&user).Error; err != nil {
//         c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"});
//         return;
//     }

//     c.JSON(http.StatusOK, gin.H{"data": user});
// }
