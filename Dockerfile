FROM node:14-alpine

WORKDIR /usr/cacau_trybe/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD npm run dev