FROM node:16-alpine AS dev

WORKDIR /app

RUN apk add git

RUN adduser -h /app -G node -D app

COPY --chown=app:node package.json .

RUN chown -R app:node /app

USER app

RUN npm install

COPY --chown=app:node .git .

RUN git config user.name m2ng

EXPOSE 3000

CMD [ "npm", "start" ]