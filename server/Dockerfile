FROM node:latest as development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN yarn install --production=false
COPY . .
CMD yarn start:dev

FROM node:latest as production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN yarn install --production=true
COPY . .
CMD yarn start