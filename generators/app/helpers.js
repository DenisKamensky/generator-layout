const defaultPackageJSON = require("./templates/package.json");
module.exports = {
  copyTpl: (file, props, ctx, outputFile) => {
    const params = {};
    const keys = Object.keys(props);
    keys.forEach(key => {
      params[key] = ctx.props[props[key]];
    });
    return ctx.fs.copyTpl(
      ctx.templatePath(file),
      ctx.destinationPath(outputFile || file),
      params
    );
  },
  copy: (file, ctx, outputFile) => {
    return ctx.fs.copy(
      ctx.templatePath(file),
      ctx.destinationPath(outputFile || file)
    );
  },

  generatePackageJSON: config => {
    const JSON = Object.assign({}, defaultPackageJSON);
    JSON.name = config.projectName;
    if (config.prePros) {
      JSON.devDependencies["gulp-sourcemaps"] = "^2.6.5";
      if (config.preProsType === "sass") {
        JSON.devDependencies["gulp-sass"] = "^4.0.2";
      } else {
        JSON.devDependencies["gulp-less"] = "^4.0.1";
      }
    }

    if (config.pug) {
      JSON.devDependencies["gulp-pug"] = "^4.0.1";
      JSON.devDependencies["gulp-html-prettify"] = "0.0.1";
    }

    if (config.js) {
      JSON.devDependencies["assets-webpack-plugin"] = "^3.9.10";
      JSON.devDependencies.gulplog = "^1.0.0";
      JSON.devDependencies["vinyl-named"] = "^1.1.0";
      JSON.devDependencies["webpack-stream"] = "^5.2.1";
      JSON.devDependencies.webpack = "^4.39.2";
      JSON.devDependencies["@babel/core"] = "^7.5.5";
      JSON.devDependencies["@babel/preset-env"] = "^7.5.5";
      JSON.devDependencies["babel-loader"] = "^8.0.6";
      JSON.devDependencies["@babel/plugin-transform-classes"] = "^7.5.5";
      JSON.devDependencies["@babel/plugin-transform-destructuring"] = "^7.5.0";
      JSON.devDependencies["@babel/plugin-transform-template-literals"] =
        "^7.4.4";
    }

    return JSON;
  }
};
