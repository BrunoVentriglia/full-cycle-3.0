FROM node:15

WORKDIR /app

COPY ./desafio-node/docker-entrypoint.sh /usr/bin/docker-entrypoint

COPY ./desafio-node/package*.json .

RUN npm install

COPY ./desafio-node/. .

EXPOSE 3000

CMD ["docker-entrypoint"]

