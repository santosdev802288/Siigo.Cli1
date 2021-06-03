const verifyNewVersion = require("../../utils/notification");
const os = require('os')
const Generator = require('yeoman-generator/lib');
const path = require('path');
const colorize = require('json-colorizer');
const shell = require("shelljs")
const req = require("../../utils/required-tools")
const {siigosay} = require('@nodesiigo/siigosay')

module.exports = class extends Generator {
    constructor(args, opt) {
        
        req()
        verifyNewVersion()        
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


    writing() {

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
};
