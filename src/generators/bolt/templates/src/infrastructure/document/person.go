// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package document

import "github.com/go-bongo/bongo"

type Person struct {
	bongo.DocumentBase `bson:", inline"`
	FirstName          string
	LastName           string
	Gender             string
	HomeAddress        HomeAddress
}

type HomeAddress struct {
	Street string
	Suite  string
	City   string
	State  string
	Zip    string
}
