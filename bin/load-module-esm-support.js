'use strict';

var fs = require('fs');
var extnamePath = require('path').extname;
var resolvePath = require('path').resolve;

var cwd = process.cwd();
var pkgPath = resolvePath(cwd, 'package.json');

var isModulePackage = fs.existsSync(pkgPath) && require(pkgPath).type === 'module';

module.exports = function (file) {
    var ext = extnamePath(file);

    if (ext === '.mjs' || isModulePackage && ext === '.js') {
        import(resolvePath(cwd, file));
    } else {
        require(resolvePath(cwd, file));
    }
};
