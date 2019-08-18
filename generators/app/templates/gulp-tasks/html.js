const gulp = require('gulp');

module.exports = function() {
  return gulp.src('src/**.html')
          .pipe(gulp.dest('public'))
}