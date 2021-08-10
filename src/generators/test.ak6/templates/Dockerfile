FROM node:16-alpine3.11 as build
WORKDIR /test
COPY . .
RUN npm install -g npm@7.16.0
RUN npm i
RUN npm run build

FROM loadimpact/k6:latest
ENV K6_STATSD_ADDR=52.247.86.112:8125
ENV K6_STATSD_ENABLE_TAGS=true
COPY --from=build /test/ .
