FROM node:latest

MAINTAINER Rachel Dorn

ENV CONTAINER_PATH /var/www/recipe-search

WORKDIR $CONTAINER_PATH

RUN npm install supervisor -g

EXPOSE 3000

ENTRYPOINT ["supervisor", "server.js"]
