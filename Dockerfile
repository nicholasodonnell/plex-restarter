FROM node:16-buster-slim as dev

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile && yarn cache clean

EXPOSE 3000

CMD [ "yarn", "dev" ]

FROM dev as build

ENV NODE_ENV=production

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
