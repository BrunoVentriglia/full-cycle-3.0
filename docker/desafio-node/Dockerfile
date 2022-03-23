FROM node:15

WORKDIR /app

COPY ./desafio-node/package*.json .

RUN npm install

COPY ./desafio-node/. .

EXPOSE 3000

CMD ["node", "/app/index.js"]

