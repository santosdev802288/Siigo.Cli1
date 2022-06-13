#!/bin/bash

local_token="fdd6b916347535dcf943fe1bea3de80261f5b5c0"
local_host="http://localhost:81"
project_name="Siigo.FixedML"

dir="$(pwd)"
token=$local_token
sonarhost=$local_host

dotnet tool update --global dotnet-sonarscanner --version "5.*"
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
dotnet build-server shutdown

dotnet sonarscanner begin /k:"${project_name}" /d:sonar.host.url="${sonarhost}" /d:sonar.login="${token}" /d:sonar.language="cs" /d:sonar.exclusions="**/bin/**/*,**/obj/**/*" /d:sonar.cs.opencover.reportsPaths="${dir}/Tests/**/coverage.opencover.xml"
dotnet build
dotnet sonarscanner end /d:sonar.login="${token}"
