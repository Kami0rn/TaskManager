package unit

import (
	"testing"

	"github.com/Kami0rn/TaskManager/entity"
	. "github.com/onsi/gomega"
	"github.com/asaskevich/govalidator"
)

func TestDeadlineName(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_deadlineName`, func(t *testing.T) {

        create := entity.Deadline{
            DeadlineName:        "",
            Description: "Do workflow project",
        }

        ok, err := govalidator.ValidateStruct(create)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill Deadline"))
    })
}

func TestDeadlineDes(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_deadlineDes`, func(t *testing.T) {

        create := entity.Deadline{
            DeadlineName:        "To do list",
            Description: "",

        }

        ok, err := govalidator.ValidateStruct(create)

		

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill DeadlineDescription"))
    })
}
func TestDeadlineOk(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_listDes`, func(t *testing.T) {

        create := entity.Deadline{
            DeadlineName:        "To do list",
            Description: "ASdasd",

        }

        ok, err := govalidator.ValidateStruct(create)

		

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())


    })
}





