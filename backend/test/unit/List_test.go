package unit

import (
	"testing"
	"time"

	"github.com/Kami0rn/TaskManager/entity"
	. "github.com/onsi/gomega"
	"github.com/asaskevich/govalidator"
)

func TestListName(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_listName`, func(t *testing.T) {

        create := entity.List{
            ListName:        "",
            ListDescription: "Do workflow project",
            Process:         78.9,
            ListCrateDate:   time.Now(),
        }

        ok, err := govalidator.ValidateStruct(create)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill ListName"))
    })
}

func TestListDes(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_listDes`, func(t *testing.T) {

        create := entity.List{
            ListName:        "To do list",
            ListDescription: "",
            Process:         78.9,
            ListCrateDate:   time.Now(),
        }

        ok, err := govalidator.ValidateStruct(create)

		

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill description"))
    })
}
func TestListOk(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_listDes`, func(t *testing.T) {

        create := entity.List{
            ListName:        "To do list",
            ListDescription: "ASdasd",
            Process:         78.9,
            ListCrateDate:   time.Now(),
        }

        ok, err := govalidator.ValidateStruct(create)

		

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())


    })
}





