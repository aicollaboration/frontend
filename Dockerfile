### STAGE 1: Build ###
FROM node:12.20-alpine AS build
WORKDIR /usr/src/app

# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

COPY package.json package-lock.json ./
RUN npm install --build-from-resource
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY ./deployment/configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/treo /usr/share/nginx/html