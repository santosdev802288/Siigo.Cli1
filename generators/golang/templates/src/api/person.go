// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package api

import (
	"context"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs/uuid"
	"github.com/go-playground/validator/v10"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	pb "siigo.com/bolt/proto"
	"siigo.com/bolt/src/application/command"
	"siigo.com/bolt/src/application/query"
)

// POST Person
func (b *Controller) AddPerson(ctx context.Context, personResource *pb.PersonResource) (*pb.PersonResource, error) {
	b.mu.Lock()
	defer b.mu.Unlock()

	validate := validator.New()

	if err := validate.Struct(personResource); err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	commandMessage := cqrs.NewCommandMessage(uuid.NewUUID(), &command.CreatePersonCommand{PersonResource: personResource})
	person, _ := b.bus.Send(commandMessage)
	return person.(*pb.PersonResource), nil
}

// GET All Persons
func (b *Controller) FindAll(ctx context.Context, r *pb.FilterCriteria) (*pb.PersonResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	queryMessage := cqrs.NewQueryMessage(&query.FindAllPersonQuery{})
	tickets, err := b.bus.Send(queryMessage)

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return tickets.(*pb.PersonResponse), nil
}
