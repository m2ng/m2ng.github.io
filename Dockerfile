FROM node:16-alpine AS dev

WORKDIR /app

RUN apk add git

RUN chown -R 1000:1000 /app

# RUN adduser -h /app -G node -D app

COPY package.json .

# RUN chown -R app:node /app

# USER app

RUN npm install

COPY .git .

RUN git config user.name m2ng

EXPOSE 3000

CMD [ "npm", "start" ]