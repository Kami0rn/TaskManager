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
	// initData(db);
	
	Leader := Role{
		RoleName: "Leader",
	}
	db.Model(&Role{}).Create(&Leader)

	Member := Role{
		RoleName: "Member",
	}
	db.Model(&Role{}).Create(&Member)

	Active := TeamStatus{
		TeamStatus: "Active",
	}
	db.Model(&TeamStatus{}).Create(&Active)

	Inactive := TeamStatus{
		TeamStatus: "Inactive",
	}
	db.Model(&TeamStatus{}).Create(&Inactive)

	Deleted := TeamStatus{
		TeamStatus: "Deleted",
	}
	db.Model(&TeamStatus{}).Create(&Deleted)

	Guide := User{
		UserName: "mumu",
		Email: "gg@gmail.com",
	}
	db.Model(&User{}).Create(&Guide)

	Jay := User{
		UserName: "mumin",
		Email: "jj@gmail.com",
	}
	db.Model(&User{}).Create(&Jay)

	Poom := User{
		UserName: "poomtawan",
		Email: "pp@gmail.com",
	}
	db.Model(&User{}).Create(&Poom)

	Ben := User{
		UserName: "gigaben",
		Email: "bb@gmail.com",
	}
	db.Model(&User{}).Create(&Ben)

	Tew := User{
		UserName: "kamiorn",
		Email: "tt@gmail.com",
	}
	db.Model(&User{}).Create(&Tew)

	Chompoo := User{
		UserName: "chomchom",
		Email: "cc@gmail.com",
	}
	db.Model(&User{}).Create(&Chompoo)

	Aom := User{
		UserName: "aomaum",
		Email: "aa@gmail.com",
	}
	db.Model(&User{}).Create(&Aom)

	Ryu := User{
		UserName: "ryurim",
		Email: "rr@gmail.com",
	}
	db.Model(&User{}).Create(&Ryu)

	Bee := User{
		UserName: "beebim",
		Email: "be@gmail.com",
	}
	db.Model(&User{}).Create(&Bee)

	Sholee := User{
		UserName: "sholim",
		Email: "sh@gmail.com",
	}
	db.Model(&User{}).Create(&Sholee)
}

// func initData(db *gorm.DB) {

// }

// 	func initRole(db *gorm.DB) {
// 		roles := []Role{
// 			{
// 				Model: gorm.Model{ID:1},
// 				RoleName: Leader,
// 			},
// 			{
// 				Model: gorm.Model{ID:2},
// 				RoleName: Leader,
// 			}
// 		}
// 	}
	


