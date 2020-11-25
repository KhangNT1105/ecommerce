FROM node:10.16.0-alpine

# Sets environment variable
# posible value: dev | qc | qa | prod
ENV STAGE=dev

# Sets work directory
WORKDIR /usr/src/app

# Copy server folder and install packages
COPY server/ ./

# Copy build folder to server/public
COPY build/ ./public

# Installs dependencies
RUN apk --update add python make g++
RUN npm install

RUN REACT_APP_ENV=$STAGE

EXPOSE 8080

# Starts run command
CMD node server.js

