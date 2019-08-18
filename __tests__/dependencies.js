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
  it("should add js", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {js: true}))
      .then(() => {
        assert.jsonFileContent(
          "package.json",
          {
            devDependencies: {
              "assets-webpack-plugin": "^3.9.10",
              "gulplog": "^1.0.0",
              "vinyl-named": "^1.1.0",
              "webpack-stream": "^5.2.1",
              "webpack": "^4.39.2",
              "@babel/core": "^7.5.5",
              "@babel/preset-env": "^7.5.5",
              "babel-loader": "^8.0.6",
              "@babel/plugin-transform-classes": "^7.5.5",
              "@babel/plugin-transform-destructuring": "^7.5.0",
              "@babel/plugin-transform-template-literals": "^7.4.4",
            }
          });
        done();
      })
  })
});