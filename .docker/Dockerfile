

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
ENTRYPOINT ["dotnet", "Siigo.MyProductService.Api.dll"]


