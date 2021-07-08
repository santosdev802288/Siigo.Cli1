import os  from 'os'
import path  from 'path'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import {MicroserviceGenerator} from '../../utils/generator/microservice'


class GolangMSGenerator extends MicroserviceGenerator {
    appConfig: { description?: any; author?: any; name?: any; token?: any } = {}
    constructor(args: any, opt: any) {
        super(args, opt)

        // optionals
        this.option("project-name", {
            type: String,
            description: "Name project.",
            default: this.defaultName,
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

        this.option("personal-token", {
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
            {},
            {config: this.appConfig}
        );
        
        // Update .gitconfig
        const templateGitConfig = this.templatePath(".user/.gitconfig");
        const userGitConfig = this.destinationPath(path.join(os.homedir(), ".gitconfig"))

        if (this.fs.exists(userGitConfig)) {
            const gitConfig = this.fs.read(userGitConfig)
            if (!gitConfig.includes('insteadOf = https://dev.azure.com/SiigoDevOps')){
                const templateContent = this.fs.read(templateGitConfig)
                // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
                this.fs.appendTpl(userGitConfig, templateContent, {config: this.appConfig})
            }
        } else {
            this.fs.copyTpl(templateGitConfig, userGitConfig, {config: this.appConfig});
        }
        
        // Copy all dotfiles
        this.fs.copy(
            this.templatePath(".dots/.*"),
            this.destinationRoot(),
            {},
            {config: this.appConfig}
        );
        this.fs.copy(
            this.templatePath(".dots/.**/**/*"),
            this.destinationRoot(),
            {},
            {config: this.appConfig}
        );
    }

    end() {
        this.log(siigosay(`Execute 'make all' and Enjoy!!`))
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)

module.exports = GolangMSGenerator
