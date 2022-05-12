FROM devopsfaith/krakend:1.1

USER root

RUN apt-get update \
    && apt-get install --no-install-recommends -y vim nmap iputils-ping procps net-tools\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" app -u 1000
USER 1000

COPY krakend.json /etc/krakend/krakend.json

# Validate the config (https://www.krakend.io/docs/commands/check/)
RUN krakend check --debug --config /etc/krakend/krakend.json