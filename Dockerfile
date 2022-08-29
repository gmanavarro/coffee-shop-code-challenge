#build
FROM node:16-alpine as build

WORKDIR /usr/src/app
COPY . .
RUN yarn --frozen-lockfile && yarn build
ENTRYPOINT ["yarn","start:dev"]

