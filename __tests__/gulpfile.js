"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const { prompts, tasksFolder } = require("../data-for-tests");

describe("gulpfile", () => {
  const file = "gulpfile.js";
  it("should create a config", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(prompts)
      .then(() => {
        assert.file([file]);
        done();
      })
  });

  it("should require sass task", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {prePros: true, preProsType: "sass"}))
      .then(() => {
        assert.fileContent(file, 'const styles = require("./gulp-tasks/scss")');
        done();
      })
  });

  it("should require less task", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {prePros: true, preProsType: "less"}))
      .then(() => {
        assert.fileContent(file, "gulp.watch('src/styles/**/**.less', gulp.series('styles'));");
        assert.fileContent(file, 'const styles = require("./gulp-tasks/less")');
        done();
      })
  });

  it("should watch for a css files", (done) => {
    helpers
    .run(path.join(__dirname, "../generators/app"))
    .withPrompts(prompts)
    .then(() => {
      assert.fileContent(file, "gulp.watch('src/styles/**/**.css', gulp.series('styles'));");
      done();
    })
  })


  it("should require html task", (done) => {
    helpers
    .run(path.join(__dirname, "../generators/app"))
    .withPrompts(prompts)
    .then(() => {
      assert.file([`${tasksFolder}html.js`]);
      assert.fileContent(file, "const html = require('./gulp-tasks/html')");
      assert.fileContent(file, "gulp.watch('src/*.html', gulp.series('html'))");
      done();
    })
  });

  it("should require pug task", (done) => {
    helpers
    .run(path.join(__dirname, "../generators/app"))
    .withPrompts(Object.assign({}, prompts, {pug: true}))
    .then(() => {
      assert.file([`${tasksFolder}pug.js`]);
      assert.fileContent(file, "const html = require('./gulp-tasks/pug')");
      assert.fileContent(file, "gulp.watch('src/templates/**/**.pug', gulp.series('html'))");
      done();
    })
  })

  it("should add js task", (done) => {
    helpers
    .run(path.join(__dirname, "../generators/app"))
    .withPrompts(Object.assign({}, prompts, {js: true}))
    .then(() => {
      assert.file([`${tasksFolder}js.js`]);
      assert.fileContent(file, "const js = require('./gulp-tasks/js');");
      assert.fileContent(file, "gulp.task('js', js);");
      assert.fileContent(file, "parallelTasks.push('js')");
      assert.fileContent(file, "gulp.watch('*.js').on('change', browserSync.reload);");
      done();
    })
  })
});