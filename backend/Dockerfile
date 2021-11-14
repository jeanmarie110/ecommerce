FROM node:12-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --production --frozen-lockfile 
COPY . .
CMD [ "yarn", "start" ]
