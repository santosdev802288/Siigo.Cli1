// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
var fs = require("fs")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
var path = require("path")

var fileList: any = []

/**
 *
 * @param {string} dir
 * @param {bool} inner
 * @returns {array of files}
 * @description Walks down a file directory returning the path of the children directory,.
 *  The inner params causes the function to return just the name of the children directory
 */
function ls(dir: any, inner: any) {
    fs.readdirSync(dir).forEach((file: any) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList.push(path.join(dir, file))
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            ls(path.join(dir, file))
        }
    });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'pth' implicitly has an 'any' type.
    if (inner) return fileList.map(pth => pth.replace(/\b\w+\\/, ""));
    return fileList
}


module.exports = ls
