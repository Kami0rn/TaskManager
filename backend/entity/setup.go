package entity


import (

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"

)


var db *gorm.DB
var err error


func DB() *gorm.DB {

	return db

}



func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("TaskManager.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(
		&Background{},
		&CardStatus{},
		&Font{},
		&PaymentStatus{},
		&PaymentType{},
		&ProjectStatus{},
		&TeamStatus{},
		&Tier{},
		&WorkspaceStatus{},	
		
		&Role{},
		&UserStatus{},
		//----
		&User{},
		&Payment{},
		&Team{},
		&Workspace{},
		&ProjectSetting{},
		&Project{},
		&ProjectHistory{},
		&List{},
		&Calendar{},
		&Card{},
		&Comment{},
		&Deadline{},
		&Teammate{},


		

		
		

		
		
		

		
		
	 )

	db = database

}