FROM node:10

# Create app directory
WORKDIR /usr/src/hackerbay-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]

