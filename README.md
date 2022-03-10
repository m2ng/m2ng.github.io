# Résumé
This is a new version of my résumé.

## Preview
![preview](./resume_preview.png)

## Reference
- [https://material.io/resources/icons/?style=baseline](https://material.io/resources/icons/?style=baseline)

## Development
```bash
docker build -t m2ng-github-io-dev --target dev .
docker run --name m2ng-github-io-dev \
    --rm \
    -v "$PWD/src:/app/src:ro" -v "$PWD/public:/app/public:ro" \
    -p 3000:3000 \
    m2ng-github-io-dev
```

## Build website
```bash
docker build -t m2ng-github-io-dev --target dev .
docker run --rm --entrypoint /bin/sh -v "$PWD/build:/app/build" -v "$PWD/public:/app/public" -v "$PWD/src:/app/src" m2ng-github-io-dev -c "npm run build"
```