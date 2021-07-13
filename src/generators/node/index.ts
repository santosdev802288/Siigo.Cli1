import os  from 'os'
import path  from 'path'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import shell from "shelljs"
import {MicroserviceGenerator} from '../../utils/generator/microservice'

const _extend = require("lodash/extend")
_extend(Generator.prototype, require("yeoman-generator/lib/actions/install"))


export default class NodeMSGenerator extends MicroserviceGenerator {
    appConfig: { description?: any; author?: any; name?: any } = {}

    constructor(args: any, opt: any) {        
        super(args, opt)

        this.log(siigosay(`Siigo Generator NodeJS.`))
        const currentPath = path.basename(process.cwd())

        // optionals
        this.option("project-name", {
            type: String,
            description: "Name project.",
            default: currentPath,
            alias: 'pn'
        });

        this.option("description", {
            type: String,
            description: "Description project.",
            default: '',
            alias: 'd'
        });

        this.option("author", {
            type: String,
            default: os.userInfo().username,
            alias: 'a'
        });

        this.option("skip-install", {
            type: String,
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
