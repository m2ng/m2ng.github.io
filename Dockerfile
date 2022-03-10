FROM node:16-alpine AS dev

WORKDIR /app

RUN addgroup -g 1001 app && adduser -h /app -u 1001 -G app -D app

COPY --chown=app:app package.json .

USER app

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]