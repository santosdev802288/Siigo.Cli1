# gRPC microservice

## Introduction

This an gRPC API running on port 5002.

## Getting Started

```bash
dotnet build
dotnet run --project Siigo.MyMS.Api/Siigo.MyMS.Api.csproj
```

## Test

```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```
