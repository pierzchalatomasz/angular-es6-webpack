var path = require('path');
var fs = require('fs');

var CopyAssets = function (scripts) {
    this.scripts = scripts;
};

CopyAssets.prototype.apply = function (compiler) {
    var scripts = this.scripts;

    var createDirectory = function (filePath) {
        var dirname = path.dirname(filePath);

        if (fs.existsSync(dirname)) {
            return;
        }

        createDirectory(dirname);
        fs.mkdirSync(dirname);
    }

    compiler.plugin('done', () => {
        for (var script of scripts) {
            var entry = path.join(compiler.context, `./src/${script}`);
            var output = path.join(compiler.context, `./dist/${script}`);

            createDirectory(output);

            fs.createReadStream(entry).pipe(fs.createWriteStream(output));
        }
    });
};

module.exports = CopyAssets;