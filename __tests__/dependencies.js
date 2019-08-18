"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const { prompts } = require("../data-for-tests");

describe("dependencies", () => {

  it("should create package.json", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(prompts)
      .then(() => {
        assert.file(["package.json"]);
        done();
      })
  });
  it("should paste a project name in package.json", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(prompts)
      .then(() => {
        assert.jsonFileContent("package.json", { name: "1" });
        done();
      })
  });
  it("should add sourcemaps", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {prePros: true}))
      .then(() => {
        assert.jsonFileContent(
          "package.json",
          {
            devDependencies: {
              "gulp-sourcemaps": "^2.6.5"
            }
          });
        done();
      })
  });
  it("should add sass", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {pug: true}))
      .then(() => {
        assert.jsonFileContent(
          "package.json",
          {
            devDependencies: {
              "gulp-pug": "^4.0.1",
            }
          });
        done();
      })
  });

  it("should add less", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {prePros: true, preProsType: "less"}))
      .then(() => {
        assert.jsonFileContent(
          "package.json",
          {
            devDependencies: {
              "gulp-less": "^4.0.1",
            }
          });
        done();
      })
  })
  it("should add pug", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {prePros: true, preProsType: "less"}))
      .then(() => {
        assert.jsonFileContent(
          "package.json",
          {
            devDependencies: {
              "gulp-pug": "^4.0.1",
              "gulp-html-prettify": "0.0.1",
            }
          });
        done();
      })
  })
});