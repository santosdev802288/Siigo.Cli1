// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package command_test

import (
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	mocksCommands "siigo.com/<%= config.name %>/mocks/src/application/command"
	mocksCqrs "siigo.com/<%= config.name %>/mocks/src/cqrs"
	mocksRepository "siigo.com/<%= config.name %>/mocks/src/infrastructure/repository"
	"siigo.com/<%= config.name %>/src/application/command"
	"testing"
)


func TestCreatePersonCommandHandler_Handle(t *testing.T) {

	// Arrange
	repository := &mocksRepository.IPersonRepository{}
	personCommand := mocksCommands.NewCreatePersonCommand()
	message := mocksCqrs.NewRequestMessage(personCommand)

	repository.
		On("Save", mock.Anything).
		Return(nil, errors.New("mocked-person-db-error"))

	// Act
	handler := command.NewPersonCommandHandler(repository)

	resp, err := handler.Handle(message)

	// Assert
	assert.NotNil(t, err)
	assert.EqualError(t, err, "mocked-person-db-error")
	assert.Nil(t, resp)

	repository.AssertNumberOfCalls(t, "Save", 1)
	repository.AssertCalled(t, "Save", personCommand.PersonResource)
	repository.AssertExpectations(t)

}
