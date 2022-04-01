FROM node:15

WORKDIR /app

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY ./desafio-node/package*.json .

RUN npm install

# RUN npm i promise-mysql

RUN npm i mysql

RUN npm i retry

RUN npm i delay

# RUN npm i bluebird

COPY ./desafio-node/. .

EXPOSE 3000

CMD ["node", "index.js"]