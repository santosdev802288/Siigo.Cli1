#
# Build image
#
# To access the images locally run: "az acr login -n siigo"
#
FROM siigo.azurecr.io/golang-build:1 as build

WORKDIR /app

COPY . .

# Build binary
RUN go mod download && go mod tidy && go mod verify && go mod why
RUN GOOS=linux go build -a -o golang-app .
RUN chmod +x ./golang-app

#
# Runtime image
#
FROM siigo.azurecr.io/golang-runtime:1 as runtime

WORKDIR /app

# Copy configuration and binary
COPY --from=build /app/configuration ./configuration
COPY --from=build /app/golang-app ./

EXPOSE 11000 10000
ENTRYPOINT ["./golang-app"]