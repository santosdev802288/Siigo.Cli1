// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require("fs");
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'upgradeFil... Remove this comment to see the full error message
const upgradeFile = require("./upgrade");

/**
 *
 * @description Creates a new folder to save the tribes information
 */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'createFile... Remove this comment to see the full error message
const createFile = async (tribePath: any) => {
    fs.mkdir(path.join('./', 'tribes'),() => {
        upgradeFile(tribePath, "tribes", "tribes.json")
    });
}

module.exports = createFile
