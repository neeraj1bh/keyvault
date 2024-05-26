FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY apps/token-info-service ./apps/token-info-service
COPY libs ./libs
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN yarn install
RUN yarn build:libs
WORKDIR /usr/src/app/apps/token-info-service
RUN yarn build

CMD ["yarn", "dev:token"]

FROM node:alpine AS production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/dist ./dist

RUN yarn install --production

EXPOSE 3002
CMD ["node", "dist/apps/token-info-service/main"]
