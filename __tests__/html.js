"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");


const { prompts } = require("../data-for-tests");

describe("html", () => {
  const file = "src/index.html";
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(prompts);
  });
  it("should create a file file", () => {
    assert.file([file]);
  });
  it("should paste a project name in title", () => {
    assert.fileContent(file, "<title>1</title>");
  });

  it("should paste a link on js in html file", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {js: true}))
      .then(() => {
        assert.fileContent("src/index.html", `<script src="js/index.js"></script>`);
        done();
      })
  });
});