const { src, dest } = require("gulp");
const sharpResponsive = require("gulp-sharp-responsive");

const img = () => src("img/**/*.{jpg,png}")
  .pipe(sharpResponsive({
    formats: [
      { width: 414, rename: { suffix: "-sm" } },
      { width: 740, rename: { suffix: "-lg" } },
    ]
  }))
  .pipe(dest("dist"));


exports.default = img;