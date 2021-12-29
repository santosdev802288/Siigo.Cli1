FROM devopsfaith/krakend:1.4

USER root

ENV COMPlus_EnableDiagnostics=0

RUN apt-get update
RUN apt-get install vim -y
RUN apt-get install nmap -y
RUN apt-get install iputils-ping -y
RUN apt-get install procps -y
RUN apt-get install net-tools -y

RUN adduser --disabled-password --gecos "" app -u 1000
USER 1000

COPY krakend.json /etc/krakend/krakend.json

# Validate the config (https://www.krakend.io/docs/commands/check/)
RUN krakend check --test-gin-routes --config /etc/krakend/krakend.json