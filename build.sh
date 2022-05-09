#!/bin/sh

mkdir -p $PWD/build
docker build -t m2ng-github-io-dev --target dev .
docker run \
    --rm --entrypoint /bin/sh \
    -v "$PWD/build:/app/build" \
    -v "$PWD/public:/app/public" \
    -v "$PWD/src:/app/src" m2ng-github-io-dev \
    -c "npm run build"
bash ./jekyll.sh build