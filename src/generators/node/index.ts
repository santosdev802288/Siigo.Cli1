// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'os'.
const os = require('os')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Generator'... Remove this comment to see the full error message
const Generator = require('yeoman-generator/lib');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'colorize'.
const colorize = require('json-colorizer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'shell'.
const shell = require("shelljs")
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'siigosay'.
const {siigosay} = require('@nodesiigo/siigosay')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Microservi... Remove this comment to see the full error message
const MicroserviceGenerator = require('../../utils/generator/microservice')

const _extend = require("lodash/extend")
_extend(Generator.prototype, require("yeoman-generator/lib/actions/install"))


class NodeMSGenerator extends MicroserviceGenerator {
    constructor(args: any, opt: any) {        
        super(args, opt)

        this.log(siigosay(`Siigo Generator NodeJS.`))
        const currentPath = path.basename(process.cwd())

        // optionals
        this.option("project-name", {
            type: String,
            required: false,
            description: "Name project.",
            default: currentPath,
            alias: 'pn'
        });

        this.option("description", {
            type: String,
            required: false,
            description: "Description project.",
            default: '',
            alias: 'd'
        });

        this.option("author", {
            type: String,
            required: false,
            default: os.userInfo().username,
            alias: 'a'
        });

        this.option("skip-install", {
            type: String,
            required: false,
            default: false,
            description: 'Avoid Installing dependencies automatically.'
        });

    }

    async initializing(){

        const {description, author} = this.options
        this.appConfig = {
            description,
            author,
            name: this.options['project-name']
        };
    }

    async _doPrompting() {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const json = JSON.stringify(this.appConfig, false, '\t')

        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }))

        this.answers = await this.prompt([
            {
                type: "confirm",
                name: "ready",
                message: "Is the configuration correct?"
            }
        ]);

        if (!this.answers.ready)
            this.cancelCancellableTasks()
    }


    _doWriting() {

        this.fs.copyTpl(
            this.templatePath(""),
            this.destinationPath("."),
            {config: this.appConfig}
        );

        this.fs.copyTpl(
            this.templatePath(".*"),
            this.destinationPath("."),
            {config: this.appConfig}
        );
    }

    install() {

        shell.cp("~/.npmrc", ".npmrc")

        if(!this.options['skip-install']){
            this.installDependencies({
                npm: true,
                yarn: false,
                bower: false,
            })
        }
    }

    end() {
        this.log(siigosay(`Enjoy!!`))
    }
}

MicroserviceGenerator.yeomanInheritance(NodeMSGenerator)

module.exports = NodeMSGenerator
