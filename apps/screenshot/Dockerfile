FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app
COPY --chown=pptruser package.json .
RUN npm i 
USER root
RUN usermod -a -G node pptruser
USER pptruser