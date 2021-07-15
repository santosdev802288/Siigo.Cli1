// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package config

import (
	"fmt"
	"github.com/ilyakaznacheev/cleanenv"
	log "github.com/sirupsen/logrus"
	"os"
)

const KEY_ENV = "GO_ENV"
const defaultEnv = "Development"

// New Clean Env Configuration
func NewConfiguration() *Configuration {

	var environment string
	var cfg Configuration

	// get absolute path
	dir, err := os.Getwd()
	if err != nil {
		panic(err.Error())
	}

	// validate if exists the variable that define the environment
	if env, ok := os.LookupEnv(KEY_ENV); ok {
		environment = env
	} else {
		environment = defaultEnv
	}

	log.Infof("Starting env: %s", environment)

	// build path of the configuration by environment
	configPath := fmt.Sprintf("%s/configuration/config.%s.yaml", dir, environment)

	// read config file and set struct values
	err = cleanenv.ReadConfig(configPath, &cfg)
	if err != nil {
		panic(err.Error())
	}

	return &cfg
}
