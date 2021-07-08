// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package producer

type MyEvent struct {
	Data string
}

func (m MyEvent) Topic() *string {
	topic := "health-topic"
	return &topic
}

func (m MyEvent) Event() []byte {
	return []byte(m.Data)
}
