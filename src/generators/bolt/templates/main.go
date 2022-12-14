// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package main

import (
	"os"
	easy "dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Core.Logs.Golang.git/easy"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	log "github.com/sirupsen/logrus"
	_ "go.uber.org/automaxprocs"
	"go.uber.org/fx"
	"siigo.com/<%= config.name %>/src/api"
	"siigo.com/<%= config.name %>/src/boot"
	"siigo.com/<%= config.name %>/src/config"
	"siigo.com/<%= config.name %>/src/fxmodule"
)

func main() {
	newFxApp().Run()
}

//
func init() {
	// Log using Siigo format as default formatter.
	log.SetFormatter(&easy.Formatter{})
	// Output to stdout instead of the default stderr
	// Can be any io.Writer, see below for File example
	log.SetOutput(os.Stdout)

	// Only log the warning severity or above.
	log.SetLevel(log.InfoLevel)

	// Set Reporter
	log.SetReportCaller(true)
}

func newFxApp() *fx.App {
	return fx.New(

		// Create Struct FX Providers
		fx.Provide(
			config.NewConfiguration,
			boot.CreateGrpcServer,
			boot.CreateGrpcClient,
			runtime.NewServeMux,
			api.NewController,
		),

		// Load Module in bottom order
		fxmodule.InfrastructureModule,
		fxmodule.ApplicationModule,
		fxmodule.BrokerModule,

		// Invoke to init functions to start
		fx.Invoke(
			boot.RegisterGrpcServers,
			boot.StartGrpcServer,
			boot.RegisterGrpcHandlers,
			boot.StartHttpServer,
		),
	)
}
