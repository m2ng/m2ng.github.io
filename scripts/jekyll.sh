#!/bin/bash

IMAGE_NAME=m2ng-github-io-jekyll-base

build_image () {
  docker build -t $IMAGE_NAME -f Dockerfile.jekyll .
}

make () {
  export site_name="m2ng"
  build_image
  docker run --rm \
    -v "$PWD/apps/jekyll:/srv/jekyll" \
    -it $IMAGE_NAME \
    sh -c "chown -R jekyll /usr/gem/ && jekyll new $site_name/"
}

dev () {
  export site_name="m2ng"
  build_image
  docker run --rm \
    -p 4000:4000 \
    --name m2ng-github-io-blog-dev \
    -v "$PWD/apps/jekyll:/srv/jekyll" \
    -it $IMAGE_NAME \
    sh -c "cd $site_name && bundle exec jekyll serve --host=0.0.0.0 -b ''"
}

build () {
  export site_name="m2ng"
  build_image
  mkdir -p $PWD/build/blog
  docker run --rm \
    -v "$PWD/build/blog:/tmp/build" \
    -v "$PWD/apps/jekyll:/srv/jekyll" \
    -it $IMAGE_NAME \
    sh -c "chown -R jekyll /usr/gem/ && mkdir -p /tmp/build && chown -R jekyll /tmp/build && cd $site_name && bundle exec jekyll build -d /tmp/build && rm -rf .jekyll-cache"
}

arg1=`echo "$1" | xargs`

main () {
  if [ "$arg1" = "make" ]; then
    make
  elif [ "$arg1" = "build" ]; then
    build
  elif [ "$arg1" = "dev" ]; then
    dev
  else
    echo "./jekyll.sh make|dev|build"
  fi
}

main
