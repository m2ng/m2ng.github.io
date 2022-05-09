#!/bin/sh

git add .
git commit -m "Updates"
git push
git checkout gh-pages
cp -rf $PWD/build/* .
git add .
git commit -m "Updates"
git push
git checkout master