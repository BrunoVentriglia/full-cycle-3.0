FROM golang:1.16-buster AS build

WORKDIR /app
COPY *.go ./

RUN go run hello-world.go
RUN go build -o /hello-world hello-world.go
ENTRYPOINT ["/hello-world"]

FROM scratch
WORKDIR /
COPY --from=build /hello-world /hello-world
EXPOSE 8080
ENTRYPOINT ["/hello-world"]