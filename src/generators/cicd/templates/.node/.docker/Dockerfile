FROM node:14-slim as build

WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

RUN npm prune --production


FROM node:14-slim as runtime

# Download and install the Tracer
RUN apt-get update \
    && apt-get install curl -y \
    && apt-get install dpkg -y \
    && mkdir -p /opt/datadog \
    && mkdir -p /var/log/datadog \
    && TRACER_VERSION=$(curl -s https://api.github.com/repos/DataDog/dd-trace-dotnet/releases/latest | grep tag_name | cut -d '"' -f 4 | cut -c2-) \
    && curl -LO https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb \
    && dpkg -i ./datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb \
    && rm ./datadog-dotnet-apm_${TRACER_VERSION}_amd64.deb

# Enable the tracer
ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_DOTNET_TRACER_HOME=/opt/datadog
ENV DD_INTEGRATIONS=/opt/datadog/integrations.json
ENV DD_RUNTIME_METRICS_ENABLED=true
ENV DD_TRACE_ENABLED=true
ENV DD_LOGS_INJECTION=true

ENV COMPlus_EnableDiagnostics=0
WORKDIR /usr/src/app
USER root
COPY --from=build /usr/src/app .
RUN npm i -g pm2

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV:-Development}

RUN adduser --disabled-password --gecos "" app -u 1100
USER 1100

EXPOSE 5000
CMD [ "pm2-runtime", "dist/main.js" ]
