// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package query

import (
	"dev.azure.com/SiigoDevOps/Siigo/_git/go-cqrs.git/cqrs"
	"github.com/jucardi/go-streams/streams"
	log "github.com/sirupsen/logrus"
	"strings"
)

// FruitQueryHandlers provides methods for processing query related
type FruitQueryHandlers struct {
}

// NewFruitQueryHandler NewGreeterCommandHandlers a new InventoryCommandHandlers
func NewFruitQueryHandler() *FruitQueryHandlers {
	return &FruitQueryHandlers{}
}

// Handle processes inventory item commands.
func (gch *FruitQueryHandlers) Handle(cqrs.RequestMessage) (interface{}, error) {

	log.Info("<= HANDLE Fruit Query => ")
	var fruitArray = []string{"peach", "apple", "pear", "plum", "pineapple", "banana", "kiwi", "orange"}

	fruitsThatStartWithP := streams.

		// Creates a stream from the given array
		FromArray(fruitArray).

		// Adds a filter for strings that start with 'p'
		Filter(func(v interface{}) bool {
			return strings.HasPrefix(v.(string), "p")
		}).

		// Orders alphabetically
		OrderBy(func(a interface{}, b interface{}) int {
			return strings.Compare(a.(string), b.(string))
		}).

		// Converts back to an array
		ToArray().([]string)

	return fruitsThatStartWithP, nil

}
