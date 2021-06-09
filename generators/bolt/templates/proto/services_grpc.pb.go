// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package example

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion7

// GreeterClient is the client API for Greeter service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type GreeterClient interface {
	Greeting(ctx context.Context, in *GreetingRequest, opts ...grpc.CallOption) (*GreetingResponse, error)
}

type greeterClient struct {
	cc grpc.ClientConnInterface
}

func NewGreeterClient(cc grpc.ClientConnInterface) GreeterClient {
	return &greeterClient{cc}
}

func (c *greeterClient) Greeting(ctx context.Context, in *GreetingRequest, opts ...grpc.CallOption) (*GreetingResponse, error) {
	out := new(GreetingResponse)
	err := c.cc.Invoke(ctx, "/services.Greeter/Greeting", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// GreeterServer is the server API for Greeter service.
// All implementations should embed UnimplementedGreeterServer
// for forward compatibility
type GreeterServer interface {
	Greeting(context.Context, *GreetingRequest) (*GreetingResponse, error)
}

// UnimplementedGreeterServer should be embedded to have forward compatible implementations.
type UnimplementedGreeterServer struct {
}

func (UnimplementedGreeterServer) Greeting(context.Context, *GreetingRequest) (*GreetingResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Greeting not implemented")
}

// UnsafeGreeterServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to GreeterServer will
// result in compilation errors.
type UnsafeGreeterServer interface {
	mustEmbedUnimplementedGreeterServer()
}

func RegisterGreeterServer(s *grpc.Server, srv GreeterServer) {
	s.RegisterService(&_Greeter_serviceDesc, srv)
}

func _Greeter_Greeting_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GreetingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(GreeterServer).Greeting(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/services.Greeter/Greeting",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(GreeterServer).Greeting(ctx, req.(*GreetingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Greeter_serviceDesc = grpc.ServiceDesc{
	ServiceName: "services.Greeter",
	HandlerType: (*GreeterServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Greeting",
			Handler:    _Greeter_Greeting_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services.proto",
}

// HealthClient is the client API for Health service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type HealthClient interface {
	Health(ctx context.Context, in *HealthRequest, opts ...grpc.CallOption) (*HealthResponse, error)
}

type healthClient struct {
	cc grpc.ClientConnInterface
}

func NewHealthClient(cc grpc.ClientConnInterface) HealthClient {
	return &healthClient{cc}
}

func (c *healthClient) Health(ctx context.Context, in *HealthRequest, opts ...grpc.CallOption) (*HealthResponse, error) {
	out := new(HealthResponse)
	err := c.cc.Invoke(ctx, "/services.Health/Health", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// HealthServer is the server API for Health service.
// All implementations should embed UnimplementedHealthServer
// for forward compatibility
type HealthServer interface {
	Health(context.Context, *HealthRequest) (*HealthResponse, error)
}

// UnimplementedHealthServer should be embedded to have forward compatible implementations.
type UnimplementedHealthServer struct {
}

func (UnimplementedHealthServer) Health(context.Context, *HealthRequest) (*HealthResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Health not implemented")
}

// UnsafeHealthServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to HealthServer will
// result in compilation errors.
type UnsafeHealthServer interface {
	mustEmbedUnimplementedHealthServer()
}

func RegisterHealthServer(s *grpc.Server, srv HealthServer) {
	s.RegisterService(&_Health_serviceDesc, srv)
}

func _Health_Health_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(HealthRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(HealthServer).Health(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/services.Health/Health",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(HealthServer).Health(ctx, req.(*HealthRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Health_serviceDesc = grpc.ServiceDesc{
	ServiceName: "services.Health",
	HandlerType: (*HealthServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Health",
			Handler:    _Health_Health_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services.proto",
}

// ErrClient is the client API for Err service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ErrClient interface {
	Error(ctx context.Context, in *HealthRequest, opts ...grpc.CallOption) (*HealthResponse, error)
}

type errClient struct {
	cc grpc.ClientConnInterface
}

func NewErrClient(cc grpc.ClientConnInterface) ErrClient {
	return &errClient{cc}
}

func (c *errClient) Error(ctx context.Context, in *HealthRequest, opts ...grpc.CallOption) (*HealthResponse, error) {
	out := new(HealthResponse)
	err := c.cc.Invoke(ctx, "/services.Err/Error", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ErrServer is the server API for Err service.
// All implementations should embed UnimplementedErrServer
// for forward compatibility
type ErrServer interface {
	Error(context.Context, *HealthRequest) (*HealthResponse, error)
}

// UnimplementedErrServer should be embedded to have forward compatible implementations.
type UnimplementedErrServer struct {
}

func (UnimplementedErrServer) Error(context.Context, *HealthRequest) (*HealthResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Error not implemented")
}

// UnsafeErrServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ErrServer will
// result in compilation errors.
type UnsafeErrServer interface {
	mustEmbedUnimplementedErrServer()
}

func RegisterErrServer(s *grpc.Server, srv ErrServer) {
	s.RegisterService(&_Err_serviceDesc, srv)
}

func _Err_Error_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(HealthRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ErrServer).Error(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/services.Err/Error",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ErrServer).Error(ctx, req.(*HealthRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Err_serviceDesc = grpc.ServiceDesc{
	ServiceName: "services.Err",
	HandlerType: (*ErrServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Error",
			Handler:    _Err_Error_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services.proto",
}

// PersonClient is the client API for Person service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PersonClient interface {
	AddPerson(ctx context.Context, in *PersonResource, opts ...grpc.CallOption) (*PersonResource, error)
	FindAll(ctx context.Context, in *FilterCriteria, opts ...grpc.CallOption) (*PersonResponse, error)
}

type personClient struct {
	cc grpc.ClientConnInterface
}

func NewPersonClient(cc grpc.ClientConnInterface) PersonClient {
	return &personClient{cc}
}

func (c *personClient) AddPerson(ctx context.Context, in *PersonResource, opts ...grpc.CallOption) (*PersonResource, error) {
	out := new(PersonResource)
	err := c.cc.Invoke(ctx, "/services.Person/AddPerson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *personClient) FindAll(ctx context.Context, in *FilterCriteria, opts ...grpc.CallOption) (*PersonResponse, error) {
	out := new(PersonResponse)
	err := c.cc.Invoke(ctx, "/services.Person/FindAll", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PersonServer is the server API for Person service.
// All implementations should embed UnimplementedPersonServer
// for forward compatibility
type PersonServer interface {
	AddPerson(context.Context, *PersonResource) (*PersonResource, error)
	FindAll(context.Context, *FilterCriteria) (*PersonResponse, error)
}

// UnimplementedPersonServer should be embedded to have forward compatible implementations.
type UnimplementedPersonServer struct {
}

func (UnimplementedPersonServer) AddPerson(context.Context, *PersonResource) (*PersonResource, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddPerson not implemented")
}
func (UnimplementedPersonServer) FindAll(context.Context, *FilterCriteria) (*PersonResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindAll not implemented")
}

// UnsafePersonServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PersonServer will
// result in compilation errors.
type UnsafePersonServer interface {
	mustEmbedUnimplementedPersonServer()
}

func RegisterPersonServer(s *grpc.Server, srv PersonServer) {
	s.RegisterService(&_Person_serviceDesc, srv)
}

func _Person_AddPerson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PersonResource)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PersonServer).AddPerson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/services.Person/AddPerson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PersonServer).AddPerson(ctx, req.(*PersonResource))
	}
	return interceptor(ctx, in, info, handler)
}

func _Person_FindAll_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FilterCriteria)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PersonServer).FindAll(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/services.Person/FindAll",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PersonServer).FindAll(ctx, req.(*FilterCriteria))
	}
	return interceptor(ctx, in, info, handler)
}

var _Person_serviceDesc = grpc.ServiceDesc{
	ServiceName: "services.Person",
	HandlerType: (*PersonServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "AddPerson",
			Handler:    _Person_AddPerson_Handler,
		},
		{
			MethodName: "FindAll",
			Handler:    _Person_FindAll_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "services.proto",
}
