// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package api

import (
	"context"
	"errors"
	"github.com/hashicorp/go-multierror"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	pb "siigo.com/bolt/proto"
)

func (b *Controller) Error(ctx context.Context, request *pb.HealthRequest) (*pb.HealthResponse, error) {
	var result error

	if err := stepExampleOne(); err != nil {
		result = multierror.Append(result, err)
	}
	if err := stepExampleTwo(); err != nil {
		result = multierror.Append(result, err)
	}

	return nil, status.Error(codes.PermissionDenied, result.Error())
}

func stepExampleOne() error {
	return errors.New("fail something in the function one")
}

func stepExampleTwo() error {
	return MyLogicError{}
}

// custom construct error
type MyLogicError struct {
}

func (receiver MyLogicError) Error() string {
	return "This is my error"
}
