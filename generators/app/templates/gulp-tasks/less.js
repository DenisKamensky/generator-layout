const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const path = require("path");
const gulpif = require('gulp-if');
const sourceMaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const rev = require('gulp-rev');
const env = process.env.NODE_ENV;
const csso = require("gulp-csso");
module.exports = (browserSync) => () => {
  return gulp.src('src/styles/*.less')
    .pipe(gulpif(env !== "production", sourceMaps.init()))
    .pipe(less({
      paths: [ path.join(__dirname, 'src/styles/', 'includes') ]
    }))
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