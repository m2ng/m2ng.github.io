FROM node:latest

WORKDIR /app
RUN apt update -y && apt install -y libvips-dev
COPY package.json .
RUN npm i
# RUN mkdir preview
COPY index.js .

ENTRYPOINT ["npx", "gulp", "-f", "index.js"]