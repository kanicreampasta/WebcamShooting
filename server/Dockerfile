FROM golang:alpine

RUN apk update
RUN apk add make

WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN go mod download && go mod verify
RUN ls
RUN make all
RUN go build -v -o /usr/local/bin/server

CMD ["/usr/local/bin/server"]
