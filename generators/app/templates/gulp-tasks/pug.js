const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function() {
    return gulp.src('src/templates/*.pug')
          .pipe(pug({
            pretty: true,
            data: {}
          }))
          .pipe(gulp.dest('public'))
}