#!/bin/sh

cd apps/main
docker build -t m2ng-github-io-react-base -f Dockerfile .
docker run --name m2ng-github-io-react-base \
    --rm \
    -v "$PWD/src:/app/src:ro" -v "$PWD/public:/app/public:ro" \
    -p 3000:3000 \
    m2ng-github-io-react-base