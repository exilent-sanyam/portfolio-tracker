FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 8080

CMD node server