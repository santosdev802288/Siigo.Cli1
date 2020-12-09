var fs = require("fs")
var path = require("path")

var fileList = []

/**
 *
 * @param {string} dir
 * @param {bool} inner
 * @returns {array of files}
 * @description Walks down a file directory returning the path of the children directory,.
 *  The inner params causes the function to return just the name of the children directory
 */
function walkFilesSync(dir, inner) {
    let files = fs.readdirSync(dir).forEach(file => {
        fs.statSync(path.join(dir, file)).isDirectory() ?
            walkFilesSync(path.join(dir, file)) :
            fileList.push(file)
    });
    if (inner) return fileList.map(pth => pth.replace(/\b\w+\\/, ""))
    return fileList
}


module.exports = walkFilesSync
