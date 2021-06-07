// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package query_test

import (
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	mocksQueries "siigo.com/bolt/mocks/src/application/query"
	mocksCqrs "siigo.com/bolt/mocks/src/cqrs"
	mocksFinder "siigo.com/bolt/mocks/src/infrastructure/finder"
	siigo "siigo.com/bolt/proto"
	"siigo.com/bolt/src/application/query"
	"testing"
)

func TestPersonQueryHandlers_Handle_WithError(t *testing.T) {

	// Arrange
	finder := &mocksFinder.IPersonFinder{}
	findAllQuery := mocksQueries.NewFindAllQueryPerson()
	message := mocksCqrs.NewRequestMessage(findAllQuery)

	method := "FindAll"

	finder.
		On(method, mock.Anything).
		Return(nil, errors.New("mocked-person-db-error"))

	// Act
	handler := query.NewPersonQueryHandler(finder)

	resp, err := handler.Handle(message)

	// Assert
	assert.NotNil(t, err)
	assert.EqualError(t, err, "mocked-person-db-error")
	assert.Nil(t, resp)

	finder.AssertNumberOfCalls(t, method, 1)
	finder.AssertCalled(t, method)
	finder.AssertExpectations(t)

}

func TestPersonQueryHandlers_Handle(t *testing.T) {

	// Arrange
	finder := &mocksFinder.IPersonFinder{}
	findAllQuery := mocksQueries.NewFindAllQueryPerson()
	message := mocksCqrs.NewRequestMessage(findAllQuery)
	response := &siigo.PersonResponse{
		Persons: make([]*siigo.PersonResource, 0),
	}

	method := "FindAll"

	finder.
		On(method, mock.Anything).
		Return(response, nil)

	// Act
	handler := query.NewPersonQueryHandler(finder)

	resp, err := handler.Handle(message)

	// Assert
	assert.Nil(t, err)
	assert.NotNil(t, resp)
	assert.IsType(t, &siigo.PersonResponse{}, resp)
	assert.Condition(t, func() bool {
		return len(resp.(*siigo.PersonResponse).Persons) == 0
	})

	finder.AssertNumberOfCalls(t, method, 1)
	finder.AssertCalled(t, method)
	finder.AssertExpectations(t)

}
