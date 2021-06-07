// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package query

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	log "github.com/sirupsen/logrus"
	"siigo.com/bolt/src/infrastructure/finder"
)

// FruitQueryHandlers provides methods for processing query related
type PersonQueryHandlers struct {
	finder finder.IPersonFinder
}

// NewGreeterCommandHandlers a new InventoryCommandHandlers
func NewPersonQueryHandler(finder finder.IPersonFinder) *PersonQueryHandlers {
	return &PersonQueryHandlers{finder}
}

func (gch *PersonQueryHandlers) Handle(cqrs.RequestMessage) (interface{}, error) {
	log.Info("Finding all persons query handler")
	return gch.finder.FindAll()
}
