FROM siigo.azurecr.io/krakend:1

ENV FC_ENABLE=1
ENV FC_PARTIALS="/app/partials"

WORKDIR /app

COPY krakend.json /etc/krakend/krakend.json

COPY ./partials ./partials

# Validate the config (https://www.krakend.io/docs/commands/check/)
RUN krakend check --config /etc/krakend/krakend.json