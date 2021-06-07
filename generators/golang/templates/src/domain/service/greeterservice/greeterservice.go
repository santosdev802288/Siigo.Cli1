// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package greeterservice

import log "github.com/sirupsen/logrus"

// Service describe greetings service.
type Service interface {
	Health() bool
	Greeting(name string) string
}

// GreeterService implementation of the Service interface.
type GreeterService struct{}

// Return  GreeterService Instance
func NewGreeterService() Service {
	return &GreeterService{}
}

// Health implementation of the Service.
func (GreeterService) Health() bool {
	return true
}

// Greeting implementation of the Service.
func (GreeterService) Greeting(name string) (greeting string) {
	greeting = "Siigo Hello " + name
	log.WithFields(log.Fields{"greeting": greeting}).Info("Greeting Service")
	return
}
