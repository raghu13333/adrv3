# Dockerfile for React client

# Build react client
FROM node:12.18.3-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY ./client/package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]
