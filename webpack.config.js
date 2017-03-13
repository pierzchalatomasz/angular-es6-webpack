var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var GenerateIndex = require('./web_modules/generateIndex');
var InsertScripts = require('./web_modules/insertScripts');
var CopyAssets = require('./web_modules/copyAssets');

var production = require('./webpack_config/production');
var development = require('./webpack_config/development');

var webpackConfig = process.env.NODE_ENV === 'production' ? production : development;

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

var sharedConfig = {
  cache: false,
  target: 'web',
  entry: {
    app: './src/app/app.js',
    vendor: ['babel-regenerator-runtime', 'q']
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
  }
};

module.exports = _.extend(sharedConfig, webpackConfig({ scripts, styles }));