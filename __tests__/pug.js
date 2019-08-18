const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

let { prompts } = require("../data-for-tests");

prompts = Object.assign({}, prompts, {pug: true});

describe("pug", () => {
  const file = "src/templates/index.pug";
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(prompts);
  });
  it("should create a file file", () => {
    assert.file([file]);
  });
  it("should paste a link on js in pug file", (done) => {
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(Object.assign({}, prompts, {js: true}))
      .then(() => {
        assert.fileContent("src/templates/index.pug", `script(src="js/index.js")`);
        done();
      })
  });
  it("should copy mixins folder", () => {
    assert.file(["src/templates/mixins"]);
    assert.file(["src/templates/mixins/head.pug"]);
  })
});