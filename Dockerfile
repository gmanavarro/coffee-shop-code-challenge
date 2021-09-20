#build
FROM node:16.9.1 as build

WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build

ENTRYPOINT ['yarn','start:server']

#webserver
FROM nginx:1.18-alpine
COPY --from=build /usr/src/app/packages/client/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN nginx

