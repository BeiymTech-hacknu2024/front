FROM node:20-alpine
RUN apk update && \
  apk add --no-cache \
  sudo \
  g++ \
  gcc \
  make \
  git \
  python3
WORKDIR /usr/server/app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build
ENV NODE_ENV=production
CMD ["yarn", "build"]