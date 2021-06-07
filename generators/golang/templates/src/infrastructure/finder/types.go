// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package finder

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	proto "siigo.com/bolt/proto"
)

type IPersonFinder interface {
	FindAll() (*proto.PersonResponse, error)
	// ...
}

type PersonFinder struct {
	collection *mongo.Collection
	context    context.Context
}

// NewPersonFinder a new PersonFinder
func NewPersonFinder(context context.Context, collection *mongo.Collection) IPersonFinder {
	return &PersonFinder{context: context, collection: collection}
}
