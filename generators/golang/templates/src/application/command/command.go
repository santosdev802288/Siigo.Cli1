// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package command

import siigo "siigo.com/bolt/proto"

// GreeterCommand
type GreeterCommand struct {
	Name string
}

type CreatePersonCommand struct {
	PersonResource *siigo.PersonResource
}
