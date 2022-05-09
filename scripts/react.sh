#!/bin/bash

IMAGE_NAME=m2ng-github-io-dev

build_image () {
  docker build -t $IMAGE_NAME -f Dockerfile.react .
}

dev () {
  docker run \
    --name m2ng-github-io-dev \
    --rm \
    -v "$PWD/src:/app/src:ro" \
    -v "$PWD/public:/app/public:ro" \
    -p 3000:3000 \
    $IMAGE_NAME
}

build () {
  mkdir -p $PWD/build
  docker run \
    --rm \
    --entrypoint /bin/sh \
    -v "$PWD/build:/app/build" \
    -v "$PWD/public:/app/public" \
    -v "$PWD/src:/app/src" \
    $IMAGE_NAME \
    -c "npm run build"
}

arg1=`echo "$1" | xargs`

main () {
  if [ "$arg1" = "build" ]; then
    build_image && build
  elif [ "$arg1" = "dev" ]; then
    build_image && dev
  else
    echo "./react.sh dev|build"
  fi
}

main
