// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package command

import (
	_ "bytes"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	log "github.com/sirupsen/logrus"
	"siigo.com/bolt/src/domain/service/greeterservice"
	"siigo.com/bolt/src/infrastructure/repository"
)

/**************** GREETER COMMAND HANDLER  ******************/
// GreeterCommandHandler provides methods for processing commands related
// to greeter items.
type GreeterCommandHandler struct {
	service greeterservice.Service
}

// NewGreeterCommandHandler a new InventoryCommandHandlers
func NewGreeterCommandHandler(service greeterservice.Service) *GreeterCommandHandler {
	return &GreeterCommandHandler{service: service}
}

// Handle processes inventory item commands.
func (gch *GreeterCommandHandler) Handle(message cqrs.RequestMessage) (interface{}, error) {

	log.Info("<= HANDLE Greeter Command => ")
	// Return Invoking Service Domain
	return gch.service.Greeting(message.Request().(*GreeterCommand).Name), nil
}

/**************** PERSON COMMAND HANDLER  ******************/
type CreatePersonCommandHandler struct {
	repository repository.IPersonRepository
}

// NewPersonCommandHandler a new Person Command Handler
func NewPersonCommandHandler(repository repository.IPersonRepository) *CreatePersonCommandHandler {
	return &CreatePersonCommandHandler{repository: repository}
}

// Handle processes inventory item commands.
func (cph *CreatePersonCommandHandler) Handle(message cqrs.RequestMessage) (interface{}, error) {
	command := message.Request().(*CreatePersonCommand)
	log.Info("<= Saving Person => ", command.PersonResource.Firstname)
	// Return Invoking Service Domain
	return cph.repository.Save(command.PersonResource)
}
