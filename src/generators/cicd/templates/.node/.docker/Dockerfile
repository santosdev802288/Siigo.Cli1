FROM node:14-slim as build

WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package*.json ./
RUN npm ci
COPY . .

RUN npm run build

RUN npm prune --production


FROM node:14-slim as runtime

# Config the DataDog tracer
ENV DD_RUNTIME_METRICS_ENABLED=true
ENV DD_TRACE_ENABLED=true
ENV DD_LOGS_INJECTION=true

ENV COMPlus_EnableDiagnostics=0
WORKDIR /usr/src/app
USER root
RUN npm i -g pm2

COPY --from=build /usr/src/app .

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV:-Development}

RUN adduser --disabled-password --gecos "" app -u 1100
USER 1100

EXPOSE 5000
CMD [ "pm2-runtime", "dist/main.js" ]
