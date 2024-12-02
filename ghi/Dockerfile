# Dockerfile for a Node.js application
FROM node:lts-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
