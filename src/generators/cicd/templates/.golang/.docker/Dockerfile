FROM golang:1.16 as builder

WORKDIR /app

ENV GIT_TERMINAL_PROMPT=1
ENV LIBRDKAFKA_VERSION=1.5.3

ARG devops_token=kib3wbzqlhoe5pc4aqdziifdkoddi7yxkbxt76aabymbly4yv5aq
ENV GOPRIVATE=dev.azure.com
RUN git config --global url."https://anythinggoeshere:$devops_token@dev.azure.com".insteadOf "https://dev.azure.com"

RUN git clone https://github.com/edenhill/librdkafka.git && \
    cd librdkafka && \
    git checkout tags/v${LIBRDKAFKA_VERSION} && \
    ./configure --prefix=/usr && \
    make && \
    make install &&\
    ldconfig && \
    cd .. && \
    rm -rf librdkafka

COPY . .

RUN go mod download && go mod tidy && go mod verify && go mod why
RUN GOOS=linux go build -a -o app .
RUN chmod +x ./app

RUN adduser --disabled-password --gecos "" app -u 1000
USER 1000

EXPOSE 11000 10000
ENTRYPOINT ["./app"]