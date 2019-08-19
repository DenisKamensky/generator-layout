const gulp = require('gulp');

module.exports = () => {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('public/assets'))
};