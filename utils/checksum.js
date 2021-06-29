const crypto = require('crypto')
const fs = require('fs')
const os = require('os')
const path = require('path')


function findFiles (directory) {
    let fileList = []
    const files = fs.readdirSync(directory)

    files.forEach(file => {
        const fromPath = path.join(directory, file)

        const stat = fs.statSync(fromPath)
        if (stat.isFile()) {
            fileList.push(fromPath)
        } else if (stat.isDirectory()) {
            fileList = fileList.concat(findFiles(fromPath))
        }
    })
    return fileList
}

function getChecksums (directory) {
    const checksums = []
    const fileList = findFiles(directory)

    fileList.forEach(filepath => {
        const hash = crypto.createHash('sha256')
        const input = fs.readFileSync(filepath)

        hash.update(input)
        checksums.push(hash.digest('hex'))
    })

    let content = ''
    fileList.forEach((value, index) => {
        content += `${checksums[index]}  ${path.relative(directory, value)}${os.EOL}`
    })

    return content
}

module.exports = getChecksums