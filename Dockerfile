FROM trion/ng-cli as builder
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci  --debug 
COPY . .
RUN npm run build:prod:mem -- --output-path=./dist/out --configuration production

FROM nginx:1.17.5
COPY ./deployment/configs/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./deployment/configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/out /usr/share/nginx/html 
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'