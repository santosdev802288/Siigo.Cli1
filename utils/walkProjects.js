const fs = require('fs');
const path = require('path');

//
const flatten = (lists) => lists.reduce((a, b) => a.concat(b), [])

//
const getDirectories = (srcpath)  =>
    fs
        .readdirSync(srcpath)
        .map(file => path.join(srcpath, file))
        .filter(path => fs.statSync(path).isDirectory())

//
const getDirectoriesRecursive = (srcpath) =>
    [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]

//
module.exports = getDirectoriesRecursive