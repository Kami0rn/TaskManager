package entity


import (

	"gorm.io/driver/sqlite"

	"gorm.io/gorm"

)


var db *gorm.DB


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
		&Tier{},
		&PaymentStatus{},
		&PaymentType{},
		&TeamStatus{},
		&WorkspaceStatus{},	
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


		

		
		

		
		
		

		
		
	 )

	db = database

}