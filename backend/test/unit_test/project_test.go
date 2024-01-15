package unit__test

import (
	"testing"
	"time"

	"github.com/Kami0rn/TaskManager/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestProject(t *testing.T) {
	uintWorkspaceID := uint(1)
	uintProjectSettingID := uint(1)
	unitProjectStatusID := uint(1)

	g := NewGomegaWithT(t)

	t.Run(`Create Success`, func(t *testing.T) {
		project := entity.Project{
			ProjectName:        "MachineLearning",
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`ProjectName is required`, func(t *testing.T) {
		project := entity.Project{
			ProjectName:        "",
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectName is required"))
	})

	t.Run(`ProjectName is less than 3 characters`, func(t *testing.T) {
		project := entity.Project{
			ProjectName:        "se",
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectName is not in range(3|50)"))
	})

	t.Run(`ProjectName is more than 50 characters`, func(t *testing.T) {

		longProjectName := "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed."

		project := entity.Project{
			ProjectName:        longProjectName,
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectName is not in range(3|50)"))
	})

	t.Run(`ProjectCreateDate is not the current time`, func(t *testing.T) {

		project := entity.Project{
			ProjectName:        "Machine Learning",
			ProjectCreatedDate: time.Now().Add(3 * 24 * time.Hour),
			ProjectProgress:    6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectCreateDate is not the current time"))
	})

	t.Run(`ProjectProgress is negative`, func(t *testing.T) {

		project := entity.Project{
			ProjectName:        "Machine Learning",
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    -6.5,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectProgress is not in range 0 - 100"))
	})

	t.Run(`ProjectProgress is greater than 100`, func(t *testing.T) {

		project := entity.Project{
			ProjectName:        "Machine Learning",
			ProjectCreatedDate: time.Now(),
			ProjectProgress:    120.45,
			WorkspaceID:        &uintWorkspaceID,
			ProjectSettingID:   &uintProjectSettingID,
			ProjectStatusID:    &unitProjectStatusID,
		}

		ok, err := govalidator.ValidateStruct(project)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("ProjectProgress is not in range 0 - 100"))
	})
}
