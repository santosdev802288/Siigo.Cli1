# syntax=docker/dockerfile:1
FROM --platform=linux/x86_64 mcr.microsoft.com/dotnet/sdk:6.0 
COPY . /app
WORKDIR /app
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 5000
EXPOSE 6000
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh

