<% if (config.type == 'netcore') { %>

ARG VERSION=3.1-alpine3.10

FROM mcr.microsoft.com/dotnet/core/sdk:$VERSION AS build-env

WORKDIR /app

RUN dotnet tool install -g dotnet-references --version 0.0.6
ENV PATH="${PATH}:/root/.dotnet/tools"

COPY *.sln ./
COPY **/*.csproj ./
COPY **/**/*.csproj ./
COPY nuget.config ./

RUN mkdir temp && cd temp && dotnet references fix -ep ../*.sln -wd .. -rupf
RUN if [[ -d 'Tests' ]]; then dotnet sln remove Tests/**/*.csproj; fi
RUN dotnet restore *.sln

ADD . .
RUN if [[ -d 'Tests' ]]; then dotnet sln remove Tests/**/*.csproj; fi
RUN dotnet publish \
  -c Release \
  -o ./out \
  --no-restore

#----------------
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime

ENV APP_HOME=/app
WORKDIR $APP_HOME

RUN adduser --disabled-password --gecos "" app -u 1000
ENV ASPNETCORE_URLS=http://*:5000
ENV COMPlus_EnableDiagnostics=0

ARG ENV
ENV ASPNETCORE_ENVIRONMENT ${ENV:-Development}
COPY --from=build-env --chown=app:app /app/out $APP_HOME
EXPOSE 5000

USER 1000
ENTRYPOINT ["dotnet", "<%= config.mainProject %>.dll"]


<% } else if (config.type == 'net5') { %>
# NetCore 5 template Dockerfile

FROM siigo.azurecr.io/dotnet-build AS build-env

COPY *.sln ./
COPY **/*.csproj ./
COPY **/**/*.csproj ./
COPY nuget.config ./

RUN mkdir temp && cd temp && dotnet references fix -ep ../*.sln -wd .. -rupf
RUN dotnet restore *.sln

ADD . .

RUN if [[ -d 'Tests' ]]; then dotnet sln remove Tests/**/*.csproj; fi
RUN dotnet publish \
  -c Release \
  -o ./out \
  --no-restore

#----------------
FROM siigo.azurecr.io/dotnet-runtime

COPY --from=build-env --chown=app:app /app/out $APP_HOME

ENTRYPOINT ["dotnet", "<%= config.mainProject %>.dll"]

<% } else if (config.type == 'net6') { %>
FROM siigo.azurecr.io/dotnet6-build AS build-env

COPY . .

RUN dotnet publish -c Release -o ./out --self-contained true --runtime linux-x64 --framework net6.0 /p:RuntimeFrameworkVersion=6.0.0

#----------------
FROM siigo.azurecr.io/dotnet6-runtime

WORKDIR /app/out

COPY --from=build-env --chown=app:app /app/out .

ENTRYPOINT ["./<%= config.mainProject %>"]

<% } else if (config.type == 'golang') { %>

#
# Build image
#
# To access the images locally run: "az acr login -n siigo"
#
FROM siigo.azurecr.io/golang-build:1.18 as builder

COPY . .

# validate and generate protobuf code
RUN buf lint && buf mod update && buf generate

# Build binary
RUN go get -v ./...
RUN go mod download
RUN go mod tidy
RUN GOARCH=amd64 GOOS=linux go build -v -o golang-app .

#
# Runtime image
#
FROM siigo.azurecr.io/golang-runtime:1.18 as runtime

COPY --from=builder --chown=app:app /app/ ./

ENTRYPOINT ["./golang-app"]

<% } else if (config.type == 'node') { %>

#
# Imagen base para Node
# Para acceder a las imágenes siigo localmente ejecutar: "az acr login -n siigo"
#
FROM siigo.azurecr.io/node-build:2 as build

WORKDIR /app

COPY .npmrc .npmrc
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

# Compilar a binario, ver https://github.com/vercel/pkg
RUN pkg -c package.json -t node14-alpine-x64 --o dist/binary --compress GZip dist/main.js

#
# Imagen de ejecución
#
FROM siigo.azurecr.io/node-runtime:3 as runtime

WORKDIR /app

# Copiar binario construido en la imagén anteior
COPY --from=build /app/dist/binary ./

EXPOSE 5000
CMD ["/app/binary"]


<% } else { %>
# Unkwon type. Unable to generate Dockerfile content
<% } %>
