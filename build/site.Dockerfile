FROM inveracity/cryobase:latest AS builder

COPY . /web

WORKDIR /web

RUN GOOS=linux GOARCH=amd64 go build -mod vendor -ldflags="-w -s" -o cryosite

# clean image
FROM alpine:latest

COPY --from=builder /web/ /web

WORKDIR /web

CMD ["./cryosite"]
