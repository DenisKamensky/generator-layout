"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { copyTpl, copy, generatePackageJSON } = require("./helpers");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the neat ${chalk.red("generator-layout")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "what's the name of the website",
        default: this.appname
      },
      {
        type: "confirm",
        name: "pug",
        message: "do you want to use an html preprocessor (pug)?",
        default: true
      },
      {
        type: "confirm",
        name: "prePros",
        message: "do you want to use css preprocessor?",
        default: true
      },
      {
        when: function(response) {
          return response.prePros;
        },
        type: "list",
        name: "preProsType",
        message: "which preprocessor do you want to use?",
        choices: [
          {
            name: "SASS",
            value: "sass"
          },
          {
            name: "LESS",
            value: "less"
          }
        ]
      },
      {
        type: "confirm",
        name: "js",
        message: "do you want to use JS?",
        default: true
      },
      {
        type: "confirm",
        name: "assets",
        message: "do you want to use the static assets",
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const ctx = this;
    const { props } = this;
    this.spawnCommandSync("git", ["init"]);
    copy(".gitignore", ctx);
    copyTpl(
      "src/index.html",
      { name: "projectName", js: "js" },
      ctx,
      "public/index.html"
    );

    if (props.pug) {
      copyTpl(
        "src/templates/index.pug",
        { name: "projectName", js: "js" },
        ctx
      );
      copy("src/templates/mixins/", ctx);
      copy("gulp-tasks/pug.js", ctx);
    } else {
      copyTpl("src/index.html", { name: "projectName", js: "js" }, ctx);
      copy("gulp-tasks/html.js", ctx);
    }

    if (!props.prePros) {
      copy("src/styles/style.css", ctx);
      copy("gulp-tasks/css.js", ctx);
    } else if (props.preProsType === "less") {
      copy("src/styles/style.less", ctx);
      copy("gulp-tasks/less.js", ctx);
    } else {
      copy("src/styles/style.scss", ctx);
      copy("gulp-tasks/scss.js", ctx);
    }

    copyTpl(
      "gulpfile.js",
      {
        name: "projectName",
        prepros: "prePros",
        preProsType: "preProsType",
        pug: "pug",
        js: "js"
      },
      ctx
    );
    this.fs.extendJSON(
      this.destinationPath("package.json"),
      generatePackageJSON(props)
    );

    if (props.js) {
      copy("src/js/index.js", ctx);
      copy("gulp-tasks/js.js", ctx);
      copy("src/js/index.js", ctx, "public/js/index.js");
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    }).then(() => {
      this.spawnCommandSync("git", ["add", "--all"]);
      this.spawnCommandSync("git", ["commit", "-m", "'Initial commit.'"]);
    });
  }
};
