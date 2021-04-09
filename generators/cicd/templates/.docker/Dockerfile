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

<% } else { %>

<% if (config.type == 'net5') { %>
ARG VERSION=5.0-alpine3.12

FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build-env

WORKDIR /app

RUN dotnet tool install -g dotnet-references --version 0.0.6
ENV PATH="${PATH}:/root/.dotnet/tools"

# Install ASP.NET Core runtime
ENV ASPNETCORE_VERSION 3.0.0
RUN curl -SL --output aspnetcore.tar.gz https://dotnetcli.azureedge.net/dotnet/aspnetcore/Runtime/$ASPNETCORE_VERSION/aspnetcore-runtime-$ASPNETCORE_VERSION-linux-musl-x64.tar.gz \
  && mkdir -p /usr/share/dotnet \
  && tar -zxf aspnetcore.tar.gz -C /usr/share/dotnet \
  && rm aspnetcore.tar.gz \
  && ln -sf /usr/share/dotnet/dotnet /usr/bin/dotnet

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
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime

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

<% } else { %>
FROM node:13 as build

WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc .npmrc
RUN npm install
RUN npm i sonarqube-scanner
COPY . .

RUN npm run build
RUN npm run sonar

FROM node:13.0.1-alpine as run

WORKDIR /usr/src/app
USER root
COPY --from=build /usr/src/app .
RUN npm i -g pm2

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-Development}

RUN adduser --disabled-password --gecos "" app -u 1100
USER 1100

EXPOSE 5000
CMD [ "pm2-runtime", "dist/main.js" ]

<% } %>
<% } %>