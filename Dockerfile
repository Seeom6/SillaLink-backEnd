# --------- Build stage ---------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable && yarn install

COPY . .

RUN yarn build


# --------- Development stage ---------
FROM node:22-alpine AS development

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install && yarn add dotenv-cli

COPY . .

COPY --from=builder /app/dist ./dist

EXPOSE 5000

ENV NODE_ENV=development

CMD ["yarn", "start:dev"]


# --------- Production stage ---------
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --production && yarn add dotenv-cli

COPY --from=builder /app/dist ./dist

EXPOSE 5000

USER node

CMD ["yarn", "start:prod"]
