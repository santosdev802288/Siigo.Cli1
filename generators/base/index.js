const verifyNewVersion = require("../../utils/notification");
const Generator = require('yeoman-generator/lib');
const req = require("../../utils/required-tools")


module.exports = class extends Generator {
    constructor(args, opt) {
        super(args, opt)
        req()
        verifyNewVersion()
    }

    writing() {
        // Rename gitignore
        this.fs.move(
            this.destinationPath('_gitignore'),
            this.destinationPath('.gitignore')
        );
    }
};
