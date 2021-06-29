const fs = require("fs");
const path = require('path');
const upgradeFile = require("./upgrade");

/**
 *
 * @description Creates a new folder to save the tribes information
 */
const createFile = async (tribePath) => {
    fs.mkdir(path.join('./', 'tribes'),() => {
        upgradeFile(tribePath, "tribes", "tribes.json")
    });
}

module.exports = createFile
