FROM node:20.18.1-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run seed:run

CMD ["npm", "start"]
