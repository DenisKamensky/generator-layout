const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const csso = require("gulp-csso");
const gulpif = require("gulp-if");
const rev = require('gulp-rev');
const env = process.env.NODE_ENV;
module.exports = (browserSync)  => () => {
  return gulp.src('src/styles/**.css')
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 20 versions']
  }))
  .pipe(gulpif(env === "production", csso()))
  .pipe(gulpif(env === "production", rev()))
  .pipe(gulp.dest('public/styles'))
  .pipe(gulpif(env === "production", rev.manifest()))
  .pipe(gulpif(env === "production", gulp.dest('manifest')))
  .pipe(browserSync.stream());
}