FROM inveracity/cryobase:latest

COPY . /web

WORKDIR /web

RUN go build -mod vendor -o cryosite

CMD ["./cryosite"]
