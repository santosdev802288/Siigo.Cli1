FROM gcr.io/spark-operator/spark:v2.4.5

ENV \
    # Enable detection of running in a container
    DOTNET_RUNNING_IN_CONTAINER=true \
    # Enable correct mode for dotnet watch (only mode supported in a container)
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    # Skip extraction of XML docs - generally not useful within an image/container - helps performance
    NUGET_XMLDOC_MODE=skip \
    # PowerShell telemetry for docker image usage
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetCoreSDK-Debian-10

# Install .NET CLI dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        libicu63 \
        libssl1.1 \
        libstdc++6 \
        zlib1g \
		curl \
    && rm -rf /var/lib/apt/lists/*

# Install .NET Core SDK
RUN dotnet_sdk_version=3.1.202 \
    && curl -SL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$dotnet_sdk_version/dotnet-sdk-$dotnet_sdk_version-linux-x64.tar.gz \
    && dotnet_sha512='c59265d42c7277e6368ee69cb58895f43f812f584ecd0b01b4045613abb74c21f281f5a851f012625064052cb79e0f84fb5385b5f7cb4dc4ac8970ee4ee4ba71' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -ozxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet \
    # Trigger first run experience by running arbitrary cmd
    && dotnet --version

# Install Microsoft Spark Worker
ADD https://github.com/dotnet/spark/releases/download/v0.12.0/Microsoft.Spark.Worker.netcoreapp3.1.linux-x64-0.12.0.tar.gz /opt/
RUN cd /opt/ \ 
    && tar -ozxf Microsoft.Spark.Worker.netcoreapp3.1.linux-x64-0.12.0.tar.gz \
    && rm Microsoft.Spark.Worker.netcoreapp3.1.linux-x64-0.12.0.tar.gz

ENV DOTNET_WORKER_DIR /opt/Microsoft.Spark.Worker-0.12.0

COPY . .
RUN dotnet publish -o job --runtime linux-x64 -c Release

COPY Application/jars/. /opt/spark/jars
COPY Configuration /opt/spark/work-dir/Configuration
