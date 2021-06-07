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

        this.log(siigosay(`Siigo Generator Golang.`))
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

        this.option("token", {
            required: true,
            description: "Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens",
            type: String
        })

    }

    async initializing(){

        const message = "For more information execute yo siigo:core --help"

        if (this.options['token'] === 'true' || !this.options['token'] )
            throw new Error("--token is required or it should not be empty.\n " + message)

        const {description, author} = this.options
        this.appConfig = {
            description,
            author,
            name: this.options['project-name'],
            token: this.options['token'],
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

        this.fs.copy(
            this.templatePath(""),
            this.destinationPath("."),
            {config: this.appConfig}
        );

        const homedir = require('os').homedir();

        this.fs.copyTpl(
            this.templatePath(".gitconfig"),
            this.destinationPath(homedir + "/.gitconfig"),
            {config: this.appConfig}
        );

        this.fs.copy(
            this.templatePath(".dots/*"),
            this.destinationPath("."),
            {config: this.appConfig}
        );

    }

    install() {

    }

    end() {
        this.log(siigosay(`Execute 'make all' and Enjoy!!`))
    }
};
