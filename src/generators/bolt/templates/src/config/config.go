// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package config

import (
	"fmt"
	"os"

	springcloud "dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Golang.Configuration.git/Springcloud"
	"github.com/ilyakaznacheev/cleanenv"
	log "github.com/sirupsen/logrus"
)

const KEY_ENV = "GO_ENV"
const defaultEnv = "Development"

var (
	ReadConfiguration = cleanenv.ReadConfig
	LookUpEnviroment  = os.LookupEnv
)

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

	if environment != defaultEnv {
		var temporalConfig SpringCloudConfiguration
		temporalConfigPath := fmt.Sprintf("%s/Configuration/appsettings.%s.json", dir, environment)
		// read config file and set struct values
		err = ReadConfiguration(temporalConfigPath, &temporalConfig)
		if err != nil {
			panic(err.Error())
		}
		fmt.Printf("Config: %v", temporalConfig)

		var springcloudhandler = springcloud.NewHandler(temporalConfig.Springcloud["Uri"], temporalConfig.Springcloud["Name"], temporalConfig.Springcloud["Env"])
		wasConfigFound, err := springcloudhandler.InvalidateConfig(configPath, "")
		if !wasConfigFound {
			log.Printf("%v: No config record found to: %v\n ", wasConfigFound, temporalConfig.Springcloud)
		}
		if err != nil {
			log.Printf("%v: No config record found to: %v\n ", wasConfigFound, err)
		}
	}

	// read config file and set struct values
	err = cleanenv.ReadConfig(configPath, &cfg)
	if err != nil {
		panic(err.Error())
	}

	return &cfg
}
