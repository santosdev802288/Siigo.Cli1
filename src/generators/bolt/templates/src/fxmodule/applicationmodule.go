// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package fxmodule

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"go.uber.org/fx"
	"siigo.com/<%= config.name %>/src/application/command"
	"siigo.com/<%= config.name %>/src/application/query"
	"siigo.com/<%= config.name %>/src/domain/service/greeterservice"
)

// Application Module Commands And Queries
var ApplicationModule = fx.Options(
	fx.Provide(
		cqrs.NewInMemoryDispatcher,
		greeterservice.NewGreeterService,
		command.NewGreeterCommandHandler,
		command.NewPersonCommandHandler,
		query.NewFruitQueryHandler,
		query.NewPersonQueryHandler,
	),
	fx.Invoke(
		RegisterHandlers,
	),
)

// Register Commands and Queries
func RegisterHandlers(dispatcher cqrs.Dispatcher,
	createPersonCommandHandler *command.CreatePersonCommandHandler,
	greeterCommandHandler *command.GreeterCommandHandler,
	fruitsQueryHandler *query.FruitQueryHandlers,
	personQueryHandler *query.PersonQueryHandlers,
) {

	// Configure Commands
	_ = dispatcher.RegisterHandler(greeterCommandHandler, &command.GreeterCommand{})
	_ = dispatcher.RegisterHandler(createPersonCommandHandler, &command.CreatePersonCommand{})
	// Configure Queries
	_ = dispatcher.RegisterHandler(fruitsQueryHandler, &query.FruitsQuery{})
	_ = dispatcher.RegisterHandler(personQueryHandler, &query.FindAllPersonQuery{})
}
