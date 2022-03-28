FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/src/app && touch /usr/src/app/index.html

CMD [ "nginx", "-g", "daemon off;" ]