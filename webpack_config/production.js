var _ = require('lodash');
var webpack = require('webpack');
var GenerateIndex = require('../web_modules/generateIndex');
var InsertScripts = require('../web_modules/insertScripts');
var CopyAssets = require('../web_modules/copyAssets');

var global = require("./../webpack.config.js");

var local = {
    output: {
        path: __dirname,
        filename: '../dist/[name].js'
    },
    plugins: [
        new GenerateIndex(),
        new InsertScripts({
            entry: './src/index.html',
            output: './dist/index.html',
            scripts: global.scripts,
            styles: global.styles
        }),
        new CopyAssets({scripts: global.scripts, styles: global.styles}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: '../dist/assets/scripts/commons.js'
        }),
        new webpack.optimize.UglifyJsPlugin({
          exclude: /\app\.js$/,
          warnings: false
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(JSON.parse(`"${process.env.NODE_ENV}"` || '"production"'))
        })
    ]
};

module.exports = _.extend(global.config, local);
