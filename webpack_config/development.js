var webpack = require('webpack');
var GenerateIndex = require('../web_modules/generateIndex');
var InsertScripts = require('../web_modules/insertScripts');

module.exports = function ({ scripts, styles }) {
    return {
        output: {
            path: __dirname,
            filename: '../src/[name].js'
        },
        plugins: [
            new GenerateIndex(),
            new InsertScripts({
                entry: './src/index-template.html',
                output: './src/index.html',
                scripts,
                styles
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'commons',
                filename: '../src/assets/scripts/commons.js'
            }),
        ]
    }
}