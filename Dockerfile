FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 


COPY . .

EXPOSE 3000

CMD ["node", "startserver.js"]
