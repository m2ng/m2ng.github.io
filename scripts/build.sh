#!/bin/sh
# Build the CV (Bun static site) and the blog (Jekyll) into ./build.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

mkdir -p build/
(cd apps/main && bun install && CV_OUT="$ROOT/build" bun run build)
bash scripts/jekyll.sh build
