#!/bin/sh

mkdir /tmp/build
cp -r build/* /tmp/build
git checkout gh-pages
cp -r /tmp/build/* .
git add .
git commit -m "Updates"
git push
git checkout master
rm -rf /tmp/build