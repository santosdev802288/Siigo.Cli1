// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package api

import (
	"context"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs/uuid"
	pb "siigo.com/bolt/proto"
	"siigo.com/bolt/src/application/command"
)

func (b *Controller) Greeting(ctx context.Context, r *pb.GreetingRequest) (*pb.GreetingResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	commandMessage := cqrs.NewCommandMessage(uuid.NewUUID(), &command.GreeterCommand{Name: r.GetName()})
	greeting, _ := b.bus.Send(commandMessage)
	return &pb.GreetingResponse{Greeting: greeting.(string)}, nil
}
