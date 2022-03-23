FROM node:15

WORKDIR /usr/src/app

COPY . .

COPY ./desafio-node/package.json ./desafio-node/package-lock.json .

RUN npm install --save

EXPOSE 3000

CMD ["node", "index.js"]
