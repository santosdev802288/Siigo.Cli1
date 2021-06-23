const verifyNewVersion = require("../../utils/notification");
const os = require('os')
const Generator = require('yeoman-generator/lib');
const path = require('path');
const colorize = require('json-colorizer');
const req = require("../../utils/required-tools")
const {siigosay} = require('@nodesiigo/siigosay')

module.exports = class extends Generator {
    constructor(args, opt) {
        
        req()
        verifyNewVersion()        
        super(args, opt)

        this.log(siigosay(`Siigo Generator Golang.`))

        const prefixRepo = "Siigo.Microservice."
        const eSiigoPrefixRepo = "ESiigo.Microservice."

        const currentPath = path.basename(process.cwd())

        if(!currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo))
            throw new Error(`The name project should starts with ${prefixRepo} or ${eSiigoPrefixRepo}`)

        const name = currentPath.split(".").reverse()[0]

        // optionals
        this.option("project-name", {
            type: String,
            required: false,
            description: "Name project.",
            default: name.toLowerCase(),
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

        this.option("personal-token", {
            required: true,
            description: "Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens",
            type: String
        })

    }

    async initializing(){

        const message = "For more information execute yo siigo:core --help"

        if (this.options['personal-token'] === 'true' || !this.options['personal-token'] )
            throw new Error("--token is required or it should not be empty.\n " + message)

        const {description, author} = this.options
        this.appConfig = {
            description,
            author,
            name: this.options['project-name'],
            token: this.options['personal-token'],
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
            this.destinationRoot(),
            {config: this.appConfig},
        );

        this.fs.copy(
            this.templatePath(".third_party"),
            this.destinationPath("third_party"),
            {config: this.appConfig}
        );

        this.fs.move(
            this.destinationPath('_gitignore'),
            this.destinationPath('.gitignore')
        );
        
        // Update .gitconfig
        const templateGitConfig = this.templatePath(".user/.gitconfig");
        const userGitConfig = this.destinationPath(path.join(os.homedir(), ".gitconfig"))

        if (this.fs.exists(userGitConfig)) {
            const gitConfig = this.fs.read(userGitConfig)
            if (!gitConfig.includes('insteadOf = https://dev.azure.com/SiigoDevOps')){
                const templateContent = this.fs.read(templateGitConfig)
                this.fs.appendTpl(userGitConfig, templateContent, {config: this.appConfig})
            }
        } else {
            this.fs.copyTpl(templateGitConfig, userGitConfig, {config: this.appConfig});
        }
        
        // Copy all dotfiles
        this.fs.copy(
            this.templatePath(".dots/.*"),
            this.destinationRoot(),
            {config: this.appConfig}
        );
    }

    install() {

    }

    end() {
        this.log(siigosay(`Execute 'make all' and Enjoy!!`))
    }
};
