#!/bin/sh

docker build -t m2ng-github-io-react-base -f Dockerfile.react .
docker run --name m2ng-github-io-react-base \
    --rm \
    -v "$PWD/src/main:/app/src:ro" -v "$PWD/public:/app/public:ro" \
    -p 3000:3000 \
    m2ng-github-io-react-base