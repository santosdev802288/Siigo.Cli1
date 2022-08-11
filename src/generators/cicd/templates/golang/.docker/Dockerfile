#
# Build image
#
# To access the images locally run: "az acr login -n siigo"
#
FROM siigo.azurecr.io/golang-build:1.18-beta as builder

ARG PAT
ENV GOPRIVATE=dev.azure.com
RUN git config --global url."https://anythinggoeshere:$PAT@dev.azure.com".insteadOf "https://dev.azure.com"

COPY . .

# validate and generate protobuf code
# RUN buf lint && buf mod update && buf generate

# Build binary
RUN go get -v ./...
RUN go mod download
RUN go mod tidy
RUN GOARCH=amd64 GOOS=linux go build -v -o golang-app .

#
# Runtime image
#
FROM siigo.azurecr.io/golang-runtime:1.18-beta as runtime

COPY --from=builder --chown=app:app /app/ ./

ENTRYPOINT ["./golang-app"]