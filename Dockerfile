### STAGE 1: Build ###
FROM node:12.20-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY ./deployment/configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/treo /usr/share/nginx/html