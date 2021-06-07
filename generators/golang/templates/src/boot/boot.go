// Copyright 2020 Siigo. All rights reserved.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file.

package boot

import (
	"context"
	"github.com/common-nighthawk/go-figure"
	middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grape "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	log "github.com/sirupsen/logrus"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/reflection"
	"io/ioutil"
	"net"
	"os"
	"siigo.com/bolt/internal/gateway"
	pb "siigo.com/bolt/proto"
	"siigo.com/bolt/src/api"
)

// CreateGrpcServer Create server.Server Instance
func CreateGrpcServer() *grpc.Server {
	logger, _ := zap.NewProduction()
	defer logger.Sync()
	return grpc.NewServer(
		grpc.UnaryInterceptor(
			middleware.ChainUnaryServer(
				grape.UnaryServerInterceptor(logger),
			),
		),
	)
}

func CreateGrpcClient() (conn *grpc.ClientConn) {
	// Create a client connection to the gRPC Server we just started.
	// This is where the gRPC-Gateway proxies the requests.
	conn, _ = grpc.DialContext(
		context.Background(), "dns:///"+"0.0.0.0:10000",
		grpc.WithInsecure(),
		grpc.WithBlock(),
	)

	return conn
}

// Register GRPC Handlers
func RegisterGrpcHandlers(conn *grpc.ClientConn, serverMux *runtime.ServeMux) {

	register := gateway.RegisterHandlers(context.Background(), serverMux, conn)

	register(
		pb.RegisterPersonHandler,
		pb.RegisterGreeterHandler,
		pb.RegisterHealthHandler,
		pb.RegisterErrHandler,
	)
}

// Register Protobuf Services
func RegisterGrpcServers(server *grpc.Server, controller *api.Controller) {
	// Register All GrpcServers
	pb.RegisterPersonServer(server, controller)
	pb.RegisterGreeterServer(server, controller)
	pb.RegisterHealthServer(server, controller)
	pb.RegisterErrServer(server, controller)
}

// Start GrpcServers with control errors and grpc logging
func StartGrpcServer(grpcServer *grpc.Server) {

	log.Info("Starting GRPC Server ...")

	// Add Reflection Server
	reflection.Register(grpcServer)

	addr := "[::]:10000"
	lis, err := net.Listen("tcp", addr)

	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	loggerV2 := grpclog.NewLoggerV2(os.Stdout, ioutil.Discard, ioutil.Discard)
	// Serve gRPC Server
	loggerV2.Info("Serving gRPC on http://", addr)
	// Adds gRPC internal logs. This is quite verbose, so adjust as desired!
	grpclog.SetLoggerV2(loggerV2)

	go func() {
		loggerV2.Fatal(grpcServer.Serve(lis))
	}()

}

// Start Http Gateway Server
func StartHttpServer(serverMux *runtime.ServeMux) {

	log.Info("Starting HTTP Server ...")

	goFigure := figure.NewFigure("Siigo Bolt Microservice", "", true)
	goFigure.Print()
	gateway.RunServerMux(serverMux)
}
