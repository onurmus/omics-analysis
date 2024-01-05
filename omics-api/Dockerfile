FROM node:16.3.0-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=development
COPY . .
RUN npm run migration
RUN npm run build
