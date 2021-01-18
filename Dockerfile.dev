FROM node

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4000

CMD ["npm", "start"]
