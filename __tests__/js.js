"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const { prompts } = require("../data-for-tests");

describe("js", () => {
  it("should copy js files", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {js: true}))
      .then(() => {
        assert.file(["src/js/index.js"]);
        assert.file(["public/js/index.js"]);
        done();
      })
  });
});
