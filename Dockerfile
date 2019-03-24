FROM golang:1.12.1-alpine3.9

RUN apk add --no-cache git build-base

COPY . /web

WORKDIR /web

RUN go build -mod vendor -o cryosite

CMD ["./cryosite"]
