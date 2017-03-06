var webpack = require('webpack');
var path = require('path');
var GenerateIndex = require('./web_modules/generateIndex');

var definePlugin = new webpack.DefinePlugin({
  environment: JSON.stringify(JSON.parse(`"${process.env.NODE_ENV}"` || '"development"'))
});

module.exports = {
  cache: false,
  target: 'web',
  entry: ['babel-regenerator-runtime', './src/app/app.js'],
  output: {
    path: __dirname,
    filename: './src/app.js',
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
        loader: "style!css!less",
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', './src/app/shared', './src/assets/libs'],
    root: [
      path.resolve('./src/app')
    ]
  },
  plugins: [new GenerateIndex(), definePlugin]
};