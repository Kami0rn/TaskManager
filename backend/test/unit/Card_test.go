package unit

import (
	"testing"
	"time"

	"github.com/Kami0rn/TaskManager/entity"
	. "github.com/onsi/gomega"
	"github.com/asaskevich/govalidator"
)

func TestCardName(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_cardName`, func(t *testing.T) {

        create := entity.Card{
            CardName:        "",
            CardDescription: "Do workflow project",
			CreateCard:   time.Now(),
        }

        ok, err := govalidator.ValidateStruct(create)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill Cardname"))
    })
}

func TestCardDes(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`test_cardDes`, func(t *testing.T) {

        create := entity.Card{
            CardName:        "Do workflow project",
            CardDescription: "",
			CreateCard:   time.Now(),
        }

        ok, err := govalidator.ValidateStruct(create)

		

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())

        g.Expect(err.Error()).To(Equal("Please fill Card description"))
    })
}

