#!/bin/sh

docker build -t m2ng-github-io-dev --target dev .
docker run --name m2ng-github-io-dev \
    --rm \
    -v "$PWD/src:/app/src:ro" -v "$PWD/public:/app/public:ro" \
    -p 3000:3000 \
    m2ng-github-io-dev