// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package finder

import (
	"context"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gopkg.in/mgo.v2/bson"
	proto "siigo.com/bolt/proto"

	"time"
)

// GET All persons in Test Collection
func (pr PersonFinder) FindAll() (*proto.PersonResponse, error) {

	log.Info("Find all persons...")
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	defer cancel()

	var response proto.PersonResponse

	findOptions := options.Find()
	// findOptions.SetSort(bson.D{{"id", -1}}) // sort example

	cursor, err := pr.collection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		return nil, err
	}

	if err := cursor.All(context.TODO(), &response.Persons); err != nil {
		return nil, err
	}

	return &response, err
}
