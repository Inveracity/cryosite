FROM golang:1.12.0-alpine3.9

RUN apk add --no-cache git build-base

COPY . /web

WORKDIR /web

RUN go build main.go

CMD ["./main"]
