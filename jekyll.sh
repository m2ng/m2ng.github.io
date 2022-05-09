#!/bin/bash

make () {
  export site_name="m2ng"
  docker run --rm \
    -v="$PWD/src/jekyll:/srv/jekyll" \
    -it jekyll/jekyll \
    sh -c "chown -R jekyll /usr/gem/ && jekyll new $site_name/"
}

build () {
  export site_name="m2ng"
  docker run --rm \
    -v "$PWD/build/blog:/tmp/build" \
    -v "$PWD/src/jekyll:/srv/jekyll" \
    -it jekyll/jekyll \
    sh -c "chown -R jekyll /usr/gem/ && mkdir -p /tmp/build && chown -R jekyll /tmp/build && jekyll build -s ./m2ng -d /tmp/build"
}

arg1=`echo "$1" | xargs`

main () {
  if [ "$arg1" = "make" ]; then
    make
  elif [ "$arg1" = "build" ]; then
    build
  else
    echo "make or build"
  fi
}

main
