// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');

//
const flatten = (lists: any) => lists.reduce((a: any, b: any) => a.concat(b), [])

//
const getDirectories = (srcpath: any) => fs
    .readdirSync(srcpath)
    .map((file: any) => path.join(srcpath, file))
    .filter((path: any) => fs.statSync(path).isDirectory())

//
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getDirecto... Remove this comment to see the full error message
const getDirectoriesRecursive = (srcpath: any) => [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))]

//
module.exports = getDirectoriesRecursive