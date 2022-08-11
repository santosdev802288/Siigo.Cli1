#
# Build image
#
# To access the images locally run: "az acr login -n siigo"
#
<<<<<<< Updated upstream
FROM siigo.azurecr.io/golang-build:1.18-beta as builder

ARG PAT
ENV GOPRIVATE=dev.azure.com
RUN git config --global url."https://anythinggoeshere:$PAT@dev.azure.com".insteadOf "https://dev.azure.com"
=======
FROM siigo.azurecr.io/golang-build:1.18 as builder

ARG devops_token=rpu2cad4dbvg7cltdt5tsbxvuq7iuyv6qxpiwtjgzmyztxlzor4a
ENV GOPRIVATE=dev.azure.com
RUN git config --global url."https://anythinggoeshere:$devops_token@dev.azure.com".insteadOf "https://dev.azure.com"
>>>>>>> Stashed changes

COPY . .

# validate and generate protobuf code
<<<<<<< Updated upstream
# RUN buf lint && buf mod update && buf generate

# Build binary
RUN go get -v ./...
RUN go mod download
RUN go mod tidy
RUN GOARCH=amd64 GOOS=linux go build -v -o golang-app .
=======
RUN buf lint && buf mod update && buf generate

# Build binary
RUN go get ./... && go mod download && go mod tidy && go mod verify && go mod why
RUN CGO_ENABLED=0 GOARCH=amd64 GOOS=linux go build -a -o golang-app .
>>>>>>> Stashed changes

#
# Runtime image
#
<<<<<<< Updated upstream
FROM siigo.azurecr.io/golang-runtime:1.18-beta as runtime

COPY --from=builder --chown=app:app /app/ ./
=======
FROM siigo.azurecr.io/golang-runtime:1.18 as runtime

COPY --from=builder --chown=app:app /app/golang-app ./
>>>>>>> Stashed changes

ENTRYPOINT ["./golang-app"]