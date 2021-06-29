const Generator = require('yeoman-generator/lib');
const path = require('path')
const req = require("../required-tools")
const _ = require('lodash')

const verifyNewVersion = require("../notification");


const prefixRepo = "Siigo.Microservice."
const eSiigoPrefixRepo = "ESiigo.Microservice."


class MicroserviceGenerator extends Generator {

    /**
     * Trick Yeoman to call super methods
     * 
     * @param {extends MicroserviceGenerator} childClass 
     */
    static yeomanInheritance(childClass) {
        childClass.prototype.prompting = MicroserviceGenerator.prototype.prompting
        childClass.prototype.writing = MicroserviceGenerator.prototype.writing
    }

    constructor(args, opt) {
        super(args, opt)
        req()
        verifyNewVersion()

        const currentPath = path.basename(process.cwd())
        this.createPrefix = !currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo)
        this.defaultName = this.createPrefix? undefined : currentPath.split(".").reverse()[0]
    }

    async _doPrompting() { throw new Error('You have to implement _doPrompting()')}

    async prompting() {

        // Create project folder using prefix
        if(this.createPrefix){
            const prefixes = [eSiigoPrefixRepo, prefixRepo]
            this.answers = await this.prompt([
                {
                    type: 'list',
                    name: 'prefix',
                    message: 'Select project prefix',
                    choices: prefixes,
                    default: 1,
                },
            ]);
            const name = _.defaultTo(this.options['name'], this.options['project-name'])
            const appPath = path.join(process.cwd(), `${this.answers.prefix}${name}`)
            this.destinationRoot(appPath)
            process.chdir(appPath)
        }

        await this._doPrompting()
    }

    _doWriting() { throw new Error('You have to implement _doWriting()')}

    writing() {

        this._doWriting()

        // Rename gitignore
        this.fs.move(
            this.destinationPath('_gitignore'),
            this.destinationPath('.gitignore')
        );
    }
}

module.exports = MicroserviceGenerator
