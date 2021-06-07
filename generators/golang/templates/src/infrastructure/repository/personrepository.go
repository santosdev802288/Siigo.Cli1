// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package repository

import (
	"context"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"gopkg.in/mgo.v2/bson"
	siigo "siigo.com/bolt/proto"
	"time"
)

type IPersonRepository interface {
	Save(person *siigo.PersonResource) (*siigo.PersonResource, error)
}

// PersonFinder provides methods for processing mongo Person Connections
type PersonRepository struct {
	collection *mongo.Collection
	context    context.Context
}

// NewPersonRepository a new NewPersonRepository
func NewPersonRepository(context context.Context, collection *mongo.Collection) IPersonRepository {
	return &PersonRepository{context: context, collection: collection}
}

// Save Person in Mongo Repository
func (pr PersonRepository) Save(person *siigo.PersonResource) (*siigo.PersonResource, error) {

	personJSON, _ := json.Marshal(person)
	log.Info("Saving Bongo Repository:" + string(personJSON))
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	defer cancel()

	id, err := pr.collection.InsertOne(ctx, bson.M{
		"firstName":   person.Firstname,
		"lastName":    person.Lastname,
		"gender":      person.Gender,
		"homeAddress": person.HomeAddress,
	})

	if err != nil {
		return nil, err
	}

	person.Id = id.InsertedID.(primitive.ObjectID).Hex()

	return person, err
}
