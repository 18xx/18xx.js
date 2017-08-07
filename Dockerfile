FROM node:8.2-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN yarn install
COPY . .

ENV PORT 3002

EXPOSE $PORT
CMD [ "yarn", "start" ]
