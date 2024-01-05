FROM node:16.3.0-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]