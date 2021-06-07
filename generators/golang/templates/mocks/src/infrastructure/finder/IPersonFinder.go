// Code generated by mockery 2.7.5. DO NOT EDIT.

package mocks

import (
	example "siigo.com/bolt/proto"

	mock "github.com/stretchr/testify/mock"
)

// IPersonFinder is an autogenerated mock type for the IPersonFinder type
type IPersonFinder struct {
	mock.Mock
}

// FindAll provides a mock function with given fields:
func (_m *IPersonFinder) FindAll() (*example.PersonResponse, error) {
	ret := _m.Called()

	var r0 *example.PersonResponse
	if rf, ok := ret.Get(0).(func() *example.PersonResponse); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*example.PersonResponse)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func() error); ok {
		r1 = rf()
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
