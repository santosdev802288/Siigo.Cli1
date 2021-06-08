// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package api

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"sync"
)

// Controller implements the protobuf interface
type Controller struct {
	mu  *sync.RWMutex
	bus cqrs.Dispatcher
}

// New initializes a new Controller struct.
func NewController(bus cqrs.Dispatcher) *Controller {
	return &Controller{
		mu:  &sync.RWMutex{},
		bus: bus,
	}
}
