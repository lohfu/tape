'use strict';

var fs = require('fs');
var extnamePath = require('path').extname;
var resolvePath = require('path').resolve;

var cwd = process.cwd();
var pkgPath = resolvePath(cwd, 'package.json');

var isModulePackage = fs.existsSync(pkgPath) && require(pkgPath).type === 'module';

var loadingPromise;

function load(file) {
    var ext = extnamePath(file);

    if (ext === '.mjs' || isModulePackage && ext === '.js') {
        return import(resolvePath(cwd, file));
    }

    require(resolvePath(cwd, file));
}

module.exports = function (file) {
    loadingPromise = loadingPromise ? loadingPromise.then(function () {
        return load(file);
    }) : load(file);
};
