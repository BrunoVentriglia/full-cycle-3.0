FROM node:15

WORKDIR /app

COPY ./desafio-node/package*.json .

RUN npm install

COPY ./desafio-node/. .

RUN node /app/migrate.js

EXPOSE 3000

CMD ["node", "/app/index.js"]

