var path = require('path');
var fs = require('fs');

var InsertScripts = function (options) {
    this.entry = options.entry;
    this.scripts = options.scripts;
    this.output = options.output;
};

InsertScripts.prototype.apply = function (compiler) {
    var entry = this.entry;
    var output = path.join(compiler.context, this.output);
    var scripts = this.scripts;

    var createDirectory = function (filePath) {
        var dirname = path.dirname(filePath);

        if (fs.existsSync(dirname)) {
            return true;
        }

        createDirectory(dirname);
        fs.mkdirSync(dirname);
    }

    compiler.plugin('done', () => {
        var content = fs.readFileSync(entry, 'utf-8');

        var htmlToAdd = '';

        for (var x of scripts) {
            htmlToAdd += `<script src="/${x}" type="text/javascript"></script>\n\t`;
        }

        content = content.replace('<!--INSERT-SCRIPTS-->', htmlToAdd);

        createDirectory(output);
        fs.writeFileSync(output, content);
    });
};

module.exports = InsertScripts;