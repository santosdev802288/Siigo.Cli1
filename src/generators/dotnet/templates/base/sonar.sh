#!/bin/bash

local_token="94bf3dad1d42f1c6cc7b67427415ee7543a5e290"
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
