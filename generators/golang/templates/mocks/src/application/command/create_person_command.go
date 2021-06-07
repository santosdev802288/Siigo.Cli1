// Package command /*
package command

import (
	siigo "siigo.com/bolt/proto"
	"siigo.com/bolt/src/application/command"
)

func NewCreatePersonCommand() *command.CreatePersonCommand {
	return  &command.CreatePersonCommand {
		PersonResource: &siigo.PersonResource{
			Firstname:   "Juan",
		},
	}

}
