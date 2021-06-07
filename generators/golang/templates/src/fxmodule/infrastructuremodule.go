// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package fxmodule

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/fx"
	"siigo.com/bolt/src/config"
	"siigo.com/bolt/src/infrastructure/finder"
	"siigo.com/bolt/src/infrastructure/repository"
	"time"
)

// Infrastructure Module Finders and Repositories
var InfrastructureModule = fx.Options(
	fx.Provide(
		NewMongoClient,
		NewMongoContext,
		NewTestCollection,
		repository.NewPersonRepository,
		finder.NewPersonFinder,
	),
)

// Create Mongo Connection
func NewMongoClient(config *config.Configuration) *mongo.Client {

	client, err := mongo.NewClient(options.Client().ApplyURI(config.Mongo.ConnectionString))

	if err != nil {
		panic(err.Error())
	}
	return client
}

// Create New Mongo Context
func NewMongoContext() context.Context {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	return ctx
}

// Connect to Test Mongo Collection Example
func NewTestCollection(ctx context.Context, client *mongo.Client, config *config.Configuration) *mongo.Collection {
	err := client.Connect(ctx)
	if err != nil {
		panic(err.Error())
	}
	return client.
		Database(config.Mongo.Database).
		Collection(config.Mongo.Collection)
}
