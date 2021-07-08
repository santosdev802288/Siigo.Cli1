// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
var fs = require("fs")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
var path = require("path")

// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var fileList = []
/**
 *
 * @param {string} dir
 * @param {bool} inner
 * @returns {array of files}
 * @description Walks down a file directory returning the path of the children directory,.
 *  The inner params causes the function to return just the name of the children directory
 */
function walkDirectorySync(dir: any, inner: any) {
    fs.readdirSync(dir).forEach((file: any) => {
        fs.statSync(path.join(dir, file)).isDirectory() ?
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            walkDirectorySync(path.join(dir, file)) :
            fileList.push(path.join(dir, file))
    });
    if (inner) return fileList.map((pth: any) => pth.replace(/\b\w+\\/, ""));
    return fileList
}


module.exports = walkDirectorySync


