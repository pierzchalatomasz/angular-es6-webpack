var webpack = require('webpack');
var path = require('path');
var GenerateIndex = require('./web_modules/generateIndex');
var InsertScripts = require('./web_modules/insertScripts');
var CopyAssets = require('./web_modules/copyAssets');

var scripts = [
  'assets/libs/angular/angular.min.js',
  'assets/libs/angular-cookies/angular-cookies.min.js',
  'assets/libs/angular-resource/angular-resource.min.js',
  'assets/libs/angular-aria/angular-aria.min.js',
  'assets/libs/angular-animate/angular-animate.min.js',
  'assets/libs/angular-material/angular-material.min.js',
  'assets/libs/angular-messages/angular-messages.min.js',
  'assets/libs/angular-ui-router/release/angular-ui-router.min.js'
];

var styles = [
  'assets/libs/angular-material/angular-material.min.css'
];

module.exports = {
  cache: false,
  target: 'web',
  entry: {
    app: './src/app/app.js',
    vendor: ['babel-regenerator-runtime', 'q']
  },
  output: {
    path: __dirname,
    filename: './dist/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['syntax-async-functions', 'transform-regenerator']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', './src/app/shared', './src/assets/libs'],
    root: [
      path.resolve('./src/app')
    ]
  },
  plugins: [
    new GenerateIndex(),
    new InsertScripts({
      entry: './src/index.html',
      output: './dist/index.html',
      scripts,
      styles
    }),
    new CopyAssets({ scripts, styles }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: './dist/assets/commons.js'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   exclude: /\app\.js$/,
    //   warnings: false
    // })
  ]
};