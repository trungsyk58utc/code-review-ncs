FROM node:20.18.1-alpine3.21

WORKDIR /usr/src/app

COPY package*.json ./

# Cài đặt dependencies
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
