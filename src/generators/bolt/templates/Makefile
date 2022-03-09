clean:
	@echo "  >  Cleaning Project ..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go clean

build:
	@echo "  >  Building binary..."
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go build

run:
	@echo "  >  Running Siigo Bolt..."
	air

generate:
	buf generate

lint:
	buf lint

BUF_VERSION:=0.40.0

install:
	go install \
		google.golang.org/protobuf/cmd/protoc-gen-go \
		google.golang.org/grpc/cmd/protoc-gen-go-grpc \
		github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
		github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2
	curl -sSL \
    	"https://github.com/bufbuild/buf/releases/download/v${BUF_VERSION}/buf-$(shell uname -s)-$(shell uname -m)" \
    	-o "$(shell go env GOPATH)/bin/buf" && \
  	chmod +x "$(shell go env GOPATH)/bin/buf"

load_test_grpc:
	ghz --call=siigo.Greeter/Greeting -d '{"name":"Ayuwoki"}' \
	--skipFirst=0 \
  	--insecure -c 40 -z 60s \
  	--proto proto/services.proto \
  	 -i third_party/googleapis  localhost:6000

load_test_http:
	siege -c40 -t60S \
	--content-type "application/json" 'http://localhost:5000/api/health'

test:
	@echo "  >  Running Tests ..."
	go test \
    ./... -test.v; echo "TESTS FINISHED"

all: install clean generate build run