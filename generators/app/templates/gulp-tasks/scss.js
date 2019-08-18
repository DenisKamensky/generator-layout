const gulpif = require('gulp-if');
const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require("gulp-csso");
const rev = require('gulp-rev');
const env = process.env.NODE_ENV;
module.exports = (browserSync) => () => {
  return gulp.src('src/styles/*.{scss,sass}')
          .pipe(gulpif(env !== "production", sourceMaps.init()))
          .pipe(sass().on('error', sass.logError))
          .pipe(gulpif(env !== "production", sourceMaps.write()))
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