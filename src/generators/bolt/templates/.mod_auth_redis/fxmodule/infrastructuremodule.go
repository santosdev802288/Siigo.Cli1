// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package fxmodule

import (
	"context"
	"strconv"
	"time"
	
	siigoredis "dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.DistributedCache.git/Redis"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/fx"
	"siigo.com/<%= config.name %>/src/config"
	"siigo.com/<%= config.name %>/src/infrastructure/finder"
	"siigo.com/<%= config.name %>/src/infrastructure/repository"

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

func NewRedisPoolManager(config *config.Configuration) (siigoredis.IRedisPoolManager, siigoredis.RedisConfiguration) {
	var redisConf siigoredis.RedisConfiguration
	redisConf.ConnectionString = config.Redis["ConnectionString"]
	sp, _ := strconv.Atoi(config.Redis["ServerPriority"])
	ceim, _ := strconv.Atoi(config.Redis["CacheExpirationMinutes"])
	redisConf.CacheExpirationminutes = ceim
	redisConf.ServerPriority = sp

	poolManager := siigoredis.NewRedisPoolManager(redisConf)
	return poolManager, redisConf
}

