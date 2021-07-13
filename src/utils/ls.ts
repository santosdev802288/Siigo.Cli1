import fs from "fs"
import path from "path"

const fileList: string[] = []

/**
 *
 * @param {string} dir
 * @param {bool} inner
 * @returns {array of files}
 * @description Walks down a file directory returning the path of the children directory,.
 *  The inner params causes the function to return just the name of the children directory
 */
function ls(dir: any, inner?: any) {
    fs.readdirSync(dir).forEach((file: any) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList.push(path.join(dir, file))
            ls(path.join(dir, file))
        }
    });
    if (inner) return fileList.map(pth => pth.replace(/\b\w+\\/, ""));
    return fileList
}


export default ls
