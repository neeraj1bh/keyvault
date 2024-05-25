FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY apps ./apps
COPY libs ./libs
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

RUN yarn install
RUN yarn build

CMD ["yarn", "dev:key"]

FROM node:alpine AS production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/dist ./dist

RUN yarn install --production

EXPOSE 3001
CMD ["node", "dist/apps/key-master-service/main"]
