FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && mv node_modules ../

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]