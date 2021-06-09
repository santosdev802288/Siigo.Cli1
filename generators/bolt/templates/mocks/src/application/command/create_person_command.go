// Package command /*
package command

import (
	siigo "siigo.com/<%= config.name %>/proto"
	"siigo.com/<%= config.name %>/src/application/command"
)

func NewCreatePersonCommand() *command.CreatePersonCommand {
	return  &command.CreatePersonCommand {
		PersonResource: &siigo.PersonResource{
			Firstname:   "Juan",
		},
	}

}
