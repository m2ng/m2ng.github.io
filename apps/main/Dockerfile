FROM node:16-alpine
WORKDIR /app
RUN apk add git
RUN chown -R 1000:1000 /app
COPY package.json .
RUN npm install
# COPY .git .git
# RUN git config user.name m2ng
EXPOSE 3000
CMD [ "npm", "start" ]
