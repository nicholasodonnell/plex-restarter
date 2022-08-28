FROM node:18-alpine AS node

FROM docker:dind AS docker

COPY --from=node /opt /opt
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/share /usr/local/share

WORKDIR /app

FROM docker AS dev

ENV NODE_ENV=development

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile && yarn cache clean

EXPOSE 3000

CMD [ "yarn", "dev" ]

FROM dev AS build

ENV NODE_ENV=production

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]
