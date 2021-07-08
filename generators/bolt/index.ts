// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'os'.
const os = require('os')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'colorize'.
const colorize = require('json-colorizer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'siigosay'.
const {siigosay} = require('@nodesiigo/siigosay')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Microservi... Remove this comment to see the full error message
const MicroserviceGenerator = require('../../utils/generator/microservice')


class GolangMSGenerator extends MicroserviceGenerator {
    constructor(args: any, opt: any) {
        super(args, opt)

        // optionals
        this.option("project-name", {
            type: String,
            required: false,
            description: "Name project.",
            default: this.defaultName,
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
        this.log(siigosay(`Siigo Generator Golang.`))

        const message = "For more information execute yo siigo:bolt --help";

        ['personal-token', 'project-name'].forEach(option => {
            if (this.options[option] === 'true' || !this.options[option])
                throw new Error(`${option} is required or it should not be empty.\n ${message}`)
        });

        const {description, author} = this.options
        this.appConfig = {
            description,
            author,
            name: this.options['project-name'].toLowerCase(),
            token: this.options['personal-token'],
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
            this.destinationRoot(),
            {config: this.appConfig},
        );

        this.fs.copy(
            this.templatePath(".third_party"),
            this.destinationPath("third_party"),
            {config: this.appConfig}
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
        this.fs.copy(
            this.templatePath(".dots/.**/**/*"),
            this.destinationRoot(),
            {config: this.appConfig}
        );
    }

    end() {
        this.log(siigosay(`Execute 'make all' and Enjoy!!`))
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)

module.exports = GolangMSGenerator
