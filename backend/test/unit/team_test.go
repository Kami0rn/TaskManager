package unit

import (
	"fmt"
	"testing"
	"time"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestTeamName(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`team_name is required`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "", // ผิดตรงนี้
			TeamCreateDate:   time.Now(),
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("TeamName is required"))
	})

	t.Run(`team_name less than 4 digit`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "Cor", // ผิดตรงนี้
			TeamCreateDate:   time.Now(),
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("TeamName: %s does not validate as stringlength(4|15)", team.TeamName)))
	})

	t.Run(`team_name more than 15 digit`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "ThisNameIsMorethan", // ผิดตรงนี้
			TeamCreateDate:   time.Now(),
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal(fmt.Sprintf("TeamName: %s does not validate as stringlength(4|15)", team.TeamName)))
	})

	t.Run(`team_name is valid`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "Correct.89",
			TeamCreateDate:   time.Now(),
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})
}

func TestTeamCreateDate(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run(`team_create_date is required`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "Correct.89",
			TeamCreateDate:   time.Time{},
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("TeamCreateDate is required"))
	})

	t.Run(`team_create_date is valid`, func(t *testing.T) {
		team := entity.Team{
			TeamName:         "Correct.89",
			TeamCreateDate:   time.Now(),
			NumberOfTeammate: 1,
			TeamStatusID:     1,
		}

		ok, err := govalidator.ValidateStruct(team)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})
}

// func TestNumberOfTeammate(t *testing.T) {

// 	g := NewGomegaWithT(t)

// 	t.Run(`number_of_teammate is required`, func(t *testing.T) {
// 		team := entity.Team{
// 			TeamName:         "Correct.89",
// 			TeamCreateDate:   time.Now(),
// 			NumberOfTeammate: 1,
// 			TeamStatusID:     1,
// 		}

// 		ok, err := govalidator.ValidateStruct(team)

// 		g.Expect(ok).NotTo(BeTrue())
// 		g.Expect(err).NotTo(BeNil())

// 		g.Expect(err.Error()).To(Equal("NumberOfTeammate is required"))
// 	})

// 	t.Run(`number_of_teammate less than 1`, func(t *testing.T) {
// 		team := entity.Team{
// 			TeamName:         "Correct.89", // ผิดตรงนี้
// 			TeamCreateDate:   time.Now(),
// 			NumberOfTeammate: 0,
// 			TeamStatusID:     1,
// 		}

// 		ok, err := govalidator.ValidateStruct(team)

// 		g.Expect(ok).NotTo(BeTrue())
// 		g.Expect(err).NotTo(BeNil())
// 		g.Expect(team.NumberOfTeammate).To(BeNumerically("<", 0))

// 		g.Expect(err.Error()).To(Equal("NumberOfTeammate should more than 0"))
// 	})

// 	t.Run(`number_of_teammate is valid`, func(t *testing.T) {
// 		team := entity.Team{
// 			TeamName:         "Correct.89",
// 			TeamCreateDate:   time.Now(),
// 			NumberOfTeammate: 1,
// 			TeamStatusID:     1,
// 		}

// 		ok, err := govalidator.ValidateStruct(team)

// 		g.Expect(ok).To(BeTrue())
// 		g.Expect(err).To(BeNil())

// 	})
// }
