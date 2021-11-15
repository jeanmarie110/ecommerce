FROM node:12-alpine AS BUILD_IMAGE
RUN apk update && apk add yarn curl bash && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn && yarn cache clean
COPY . .
RUN yarn build
RUN npm prune --production
RUN /usr/local/bin/node-prune
RUN yarn add serve

FROM node:12-alpine
COPY --from=BUILD_IMAGE /app .
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
# CMD [ "node", "./dist/main.js" ]

CMD serve -s build
