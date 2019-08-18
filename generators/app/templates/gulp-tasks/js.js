const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const {webpack} = webpackStream;
const named = require('vinyl-named');
const isDev = process.env.NODE_ENV !== 'production';
const path = require('path');
const gulplog = require('gulplog');
const AssetsPlugin = require('assets-webpack-plugin');
const options = {
  watch : isDev,
  devtool: isDev ? 'cheap-module-inline-source-map' : false,
  output: {
    publicPath: '/js/',
    filename: isDev ? '[name].js' : '[name]-[chunkhash:10].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-classes',
              '@babel/plugin-transform-destructuring',
              '@babel/plugin-transform-template-literals'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

if (!isDev) {
  options.plugins.push(new AssetsPlugin({
    filename: 'webpack.manifest.json',
    path: path.join('manifest'),
    processOutput(assets) {
      for(let key in assets) {
        assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length);
        delete assets[key]
      }
      return JSON.stringify(assets)
    }
  }));
}

module.exports = (cb) => {
  let firstBuildReady = false;
  function done(err, stats) {
    firstBuildReady = true;
    if (err) return;
    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
      colors: true
    }))
  }
  return gulp.src('src/js/*js')
    .pipe(named())
    .pipe(webpackStream(options, null, done))
    .pipe(gulp.dest('public/js'))
    .on('data', () => {
      if (firstBuildReady) {
        cb();
      }
    })
}
