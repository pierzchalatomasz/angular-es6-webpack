var webpack = require('webpack');
var GenerateIndex = require('../web_modules/generateIndex');
var InsertScripts = require('../web_modules/insertScripts');
var CopyAssets = require('../web_modules/copyAssets');

module.exports = function ({ scripts, styles }) {
    return {
        output: {
            path: __dirname,
            filename: '../dist/[name].js'
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
                filename: '../dist/assets/scripts/commons.js'
            }),
            new webpack.optimize.UglifyJsPlugin({
              exclude: /\app\.js$/,
              warnings: false
            })
        ]
    }
}