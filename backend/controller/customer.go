package controller

import (
	"net/http"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateCustomer(c *gin.Context) {
	var customer entity.Customer

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้าง Customer
	newCustomer := entity.Customer{
		FirstName:      customer.FirstName,
		LastName:       customer.LastName,
		UserName:       customer.UserName,
		Password:       customer.Password,
		Email:          customer.Email,
		Phone:          customer.Phone,
		HashedPassword: customer.HashedPassword,
	}

	// บันทึก
	if err := entity.DB().Create(&newCustomer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newCustomer})
}

// GET /user/:id
func GetCustomer(c *gin.Context) {
	var customer entity.Customer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM customers WHERE id = ?", id).Find(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

// GET /users
func ListCustomers(c *gin.Context) {
	var customers []entity.Customer
	if err := entity.DB().Raw("SELECT * FROM customers").Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customers})
}

// DELETE /users/:id
func DeleteCustomer(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM customers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateCustomer(c *gin.Context) {
	var customer entity.Customer
	var result entity.Customer

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", customer.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

func GetCustomerByHash(c *gin.Context) {
    var customer entity.Customer
    hashedPassword := c.Param("hashed_password")

    // Replace this with a proper database query to retrieve the customer by hashed password
    if err := entity.DB().Where("hashed_password = ?", hashedPassword).First(&customer).Error; err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"});
        return;
    }

    c.JSON(http.StatusOK, gin.H{"data": customer});
}
