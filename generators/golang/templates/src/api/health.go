// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package api

import (
	"context"
	pb "siigo.com/bolt/proto"
)

func (b *Controller) Health(ctx context.Context, r *pb.HealthRequest) (*pb.HealthResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	return &pb.HealthResponse{Status: "Ok"}, nil
}

func (b *Controller) Health2(ctx context.Context, r *pb.HealthRequest) (*pb.HealthResponse, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	return &pb.HealthResponse{Status: "Ok"}, nil
}
