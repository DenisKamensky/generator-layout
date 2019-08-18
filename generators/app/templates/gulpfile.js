const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const env = process.env.NODE_ENV;
const del = require("del");
const revCollector = require('gulp-rev-collector');
const html = require('./gulp-tasks/<% if(pug){ %>pug<% } else { %>html<% } %>')
<% if(preProsType === 'less') {%>const styles = require("./gulp-tasks/less")<% } else if(preProsType){%>const styles = require("./gulp-tasks/scss")<%} else {%>const styles = require("./gulp-tasks/css");<%}%>;
const rev = require('gulp-rev');
<%if(js) {%>
const js = require('./gulp-tasks/js');
gulp.task('js', js);
<%}%>
gulp.task('html', html);
gulp.task('styles', styles(browserSync));

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './public/'
    }
  })

  <% if (!prepros) { %>
  gulp.watch('src/styles/**/**.css', gulp.series('styles'));
  <% } else if(preProsType === "sass") { %>
  gulp.watch('src/styles/**/**.{scss,sass}', gulp.series('styles'));
  <% } else { %>
  gulp.watch('src/styles/**/**.less', gulp.series('styles'));
  <%}%>
  <% if(js) {%>gulp.watch('public/js/*.js').on('change', browserSync.reload);<%}%>
  gulp.watch('<%if(pug){%>src/templates/**/**.pug<%} else {%>src/*.html<%}%>', gulp.series('html'));
  gulp.watch('public/*.html').on('change', browserSync.reload);
})

gulp.task("clean", () => {
  return del('public')
});

gulp.task('rev', function () {
  return gulp.src(['manifest/**/*.json', 'public/**/*.html'])
      .pipe(revCollector({
          replaceReved: true,
      }) )
      .pipe(gulp.dest('public'));
});

const tasks = (() => {
  let tasks = ['server'];
  <%if(js){%>tasks.unshift('js')<%}%>
  let parallelTasks = ['styles', 'html'];
  if(env === 'production') {
    tasks = [
      'clean',
      gulp.parallel(...parallelTasks),
    ];
    <%if(js){%>tasks.push('js');<%}%>
    tasks.push('rev');
  }

  return tasks;
})()


gulp.task('default', gulp.series(...tasks));
