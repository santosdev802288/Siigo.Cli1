import os from 'os'
import fs from 'fs'
import colorize from 'json-colorizer'
import { siigosay } from '@nodesiigo/siigosay'
import { MicroserviceGenerator } from '../../utils/generator/microservice'
import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile'
import { saveStatistic } from '../../utils/statistics/statistic'
import _ from "lodash";
import { TOOLS, toolsRequired } from '../../utils/required-tools'
import rename = require('gulp-rename');
import {default as replace} from 'replace-in-file';

export default class GolangMSGenerator extends MicroserviceGenerator {

    appConfig: { description?: any; author?: any; name?: any; nameUpper?: any; token?: any; auth?: any; redis?: any; email?: any; pathtoken?: any;} = {}

    constructor(args: any, opt: any) {

        super(args, opt)

        saveStatistic('golang').then()

        toolsRequired([TOOLS.BUF, TOOLS.GIT, TOOLS.TELEPRESENCE])

        // optionals
        this.option('project-name', {
            type: String,
            description: 'Name project.',
            default: this.defaultName,
            alias: 'pn'
        });

        this.option('description', {
            type: String,
            description: 'Description project',
            default: 'This is a Microservice from Siigo :)',
            alias: 'd'
        });

        this.option('author', {
            type: String,
            default: os.userInfo().username,
            alias: 'a'
        });

        this.option('personal-token', {
            description: 'Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens',
            type: String
        })
    }


    async initializing() {
        this.log(siigosay('Siigo Generator Golang.'))
    }

    async _doPrompting() {

        const siigoParams = await getAllParametersSiigo();

        if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
            this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
        } else {
            this.options['personal-token'] = siigoParams.token
        }

        const name = this.options['project-name'].toLowerCase();
        const nameUpper = _.upperFirst(name);
        const pathtoken = this.options['personal-token'];
        
        const { description } = this.options
        this.appConfig = {
            description,
            email: siigoParams.user,
            author: siigoParams.name,
            name: name,
            nameUpper: nameUpper,
            token: this.options['personal-token'],
        };


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
                type: 'confirm',
                name: 'ready',
                message: 'Is the configuration correct?'
            }
        ]);

        if (!this.answers.ready)
            this.cancelCancellableTasks()
    }

    async _doWriting() {

        // replace contract label with ejs templating
        const optionsLowwerCase = {
            files: [`${this.templatePath()}/**/*.*`, `${this.templatePath()}/**`],
            from: /contract/g,
            to: '<%= config.name %>',
        };

        const optionsUpperCase = {
            files: [`${this.templatePath()}/**/*.*`, `${this.templatePath()}/**`],
            from: /Contract/g,
            to: '<%= config.nameUpper %>',
        };

        // replace contract label with ejs templating
        const optionsPat = {
            files: [`${this.templatePath()}/**/*.*`, `${this.templatePath()}/**`],
            from: /pathtoken/g,
            to: '<%= config.token %>',
        };

        replace.sync(optionsLowwerCase)
        replace.sync(optionsUpperCase)
        replace.sync(optionsPat)

        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((parsetPath) => {
                const prefixChart = 'ms-';
                parsetPath.dirname = parsetPath.dirname.includes(prefixChart) ?
                    parsetPath.dirname.replace(/(contract)/g, this.appConfig.name) :
                    parsetPath.dirname.replace(/(Contract)/g, this.appConfig.nameUpper);
                parsetPath.basename = parsetPath.basename.replace(/(Contract)/g, this.appConfig.nameUpper);
                parsetPath.dirname.replace(/(contract)/g, (this.appConfig.name));
                parsetPath.basename = parsetPath.basename.replace(/(pathtoken)/g, this.appConfig.pathtoken);
            })
        ]);

        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator    
        this.queueTransformStream([
            rename((parsetPath) => {
                const prefixChart = 'contract';
                parsetPath.dirname = parsetPath.dirname.includes(prefixChart) ?
                    parsetPath.dirname.replace(/(contract)/g, this.appConfig.name) :
                    parsetPath.dirname.replace(/(Contract)/g, this.appConfig.nameUpper);
                parsetPath.basename = parsetPath.basename.replace(/(Contract)/g, this.appConfig.nameUpper);
                parsetPath.basename = parsetPath.basename.replace(/(contract)/g, this.appConfig.name);
                parsetPath.basename = parsetPath.basename.replace(/(token)/g, this.appConfig.pathtoken);
            })
        ]);

        //this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('_gitignore'), { config: this.appConfig });


        // copy template into current folder
        this.fs.copyTpl(
            [
                this.templatePath(),
                `!${this.templatePath(".git/")}`,
                `!${this.templatePath(".docker/")}`,
                `!${this.templatePath("azure-pipelines.yml")}`,
            ],
            this.destinationPath(),
            { config: this.appConfig },
            {},
            { globOptions: { dot: true } }
        );

    }

    end(): void {

        if (/^win/i.test(process.platform)) {
            this.log(siigosay("Execute 'docker-compose up' to start"))
        } else {
            this.log(siigosay("Execute 'make all' to start"))
        }
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)
