#!/bin/bash

local_token="920f45e9518a9d6289d99f33d9ea19a05ce7840d"
local_host="http://localhost:9200"

dir="$(pwd)"
token=$local_token
sonarhost=$local_host

dotnet tool update --global dotnet-sonarscanner --version "5.*"
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
dotnet build-server shutdown

dotnet sonarscanner begin /k:"<%= config.projectPrefix %>.<%= config.nameCapitalize %>" /d:sonar.host.url="${sonarhost}" /d:sonar.login="${token}" /d:sonar.language="cs" /d:sonar.exclusions="**/bin/**/*,**/obj/**/*" /d:sonar.cs.opencover.reportsPaths="${dir}/Tests/**/coverage.opencover.xml"
dotnet build
dotnet sonarscanner end /d:sonar.login="${token}"
