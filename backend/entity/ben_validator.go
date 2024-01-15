package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
)

func init() {
	govalidator.CustomTypeTagMap.Set("isNotFuture", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	}))
	govalidator.CustomTypeTagMap.Set("inRangre0To100", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		f := i.(float32)
		r := f >= 0 && f <= 100
		return r
	}))
}