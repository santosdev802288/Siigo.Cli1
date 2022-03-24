// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package config

type Configuration struct {
	// configuration for kafka broker
	// https://github.com/edenhill/librdkafka/blob/master/CONFIGURATION.md
	Kafka map[string]string  `yaml:"kafka"`
	Mongo MongoConfiguration `yaml:"mongo"`
}

//
type MongoConfiguration struct {
	ConnectionString string `yaml:"connectionString" env:"MONGO_CONNECTION_STRING"`
	Database         string `yaml:"database" env:"MONGO_DATABASE"`
	Collection       string `yaml:"collection" env:"MONGO_COLLECTION"`
}

type SpringCloudConfiguration struct {
	Springcloud map[string]string `json:"Spring"`
}
