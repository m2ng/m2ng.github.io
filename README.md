# Résumé + Blog
This is a new version of my résumé. The homepage is a static CV built with [Bun](https://bun.sh) (plain HTML + CSS, renders without JavaScript) while the blog is created using Jekyll.

## Build the CV
```
cd apps/main
bun install
bun run build      # emits the static site into <repo>/build
bun run preview    # build + serve at http://localhost:4321
```

## Preview
![preview](./resume_preview.png)
![preview](./blog_preview.png)

## Reference
- https://material.io/resources/icons/?style=baseline
- https://github.com/jekyll/minima/


## Make responsive images
```
docker build -t m2ng-github-io-responsive-images:latest apps/responsive-images
docker run --rm -v "$PWD/apps/jekyll/m2ng/_assets/img:/app/img:ro" -v "$PWD/apps/jekyll/m2ng/assets/img:/app/dist:rw" m2ng-github-io-responsive-images:latest
```

## Take screenshot
```
docker build -t m2ng-github-io-screenshot:latest apps/screenshot
docker run -t --init --cap-add=SYS_ADMIN -v "$PWD/apps/screenshot/index.js:/app/index.js" --rm --name screenshot -v "$PWD/preview:/app/output" m2ng-github-io-screenshot:latest npm start
```