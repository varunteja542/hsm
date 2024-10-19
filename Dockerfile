FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm install jest



EXPOSE 3000

CMD ["node", "startserver.js"]
