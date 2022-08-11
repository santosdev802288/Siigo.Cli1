import os from 'os'
import colorize from 'json-colorizer'
import {siigosay} from '@nodesiigo/siigosay'
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import {getAllParametersSiigo, wizardsiigofile} from '../../utils/siigoFile'
import {saveStatistic} from '../../utils/statistics/statistic'
import _ from "lodash";
import {TOOLS, toolsRequired} from '../../utils/required-tools'
import rename = require('gulp-rename');

export default class GolangMSGenerator extends MicroserviceGenerator {

    appConfig: { description?: any; author?: any; name?: any; nameUpper?: any; token?: any; auth?: any; redis?: any; email?: any } = {}
    
    constructor(args: any, opt: any) {

        super(args, opt)

        saveStatistic('golang').then()

        toolsRequired(TOOLS.BUF)(TOOLS.GIT)(TOOLS.DOCKER)(TOOLS.TELEPRESENCE)

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


    async initializing(){
        this.log(siigosay('Siigo Generator Golang.'))
    }

    async _doPrompting() {
                
        const siigoParams = await getAllParametersSiigo();

        if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
            this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
        }else {
            this.options['personal-token'] = siigoParams.token
        }

        const {description} = this.options
        this.appConfig = {
            description,
            email: siigoParams.user,
            author: siigoParams.name,
            name: this.options['project-name'].toLowerCase(),
            nameUpper: _.upperFirst(this.options['project-name']),
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

    _doWriting(): void {
        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
            this.queueTransformStream([
            rename((parsetPath) => {
                const prefixChart = 'ms-';
                parsetPath.dirname = parsetPath.dirname.includes(prefixChart) ?
                parsetPath.dirname.replace(/(microservice)/g, this.appConfig.name) :
                parsetPath.dirname.replace(/(Microservice)/g, _.upperFirst(this.appConfig.nameUpper));
                parsetPath.basename = parsetPath.basename.replace(/(Microservice)/g, _.upperFirst(this.appConfig.nameUpper));
                parsetPath.dirname.replace(/(microservice)/g, (this.appConfig.name));
            })
        ]);
            
        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator    
        this.queueTransformStream([
            rename((parsetPath) => {
                const prefixChart = 'microservice';
                parsetPath.dirname = parsetPath.dirname.includes(prefixChart) ? 
                parsetPath.dirname.replace(/(microservice)/g, this.appConfig.name) : 
                parsetPath.dirname.replace(/(Microservice)/g, _.upperFirst(this.appConfig.nameUpper));    
                parsetPath.basename = parsetPath.basename.replace(/(Microservice)/g, _.upperFirst(this.appConfig.nameUpper));
                parsetPath.basename = parsetPath.basename.replace(/(microservice)/g, this.appConfig.name);

            })
        ]);  
        
        this.fs.copyTpl(this.templatePath(''), this.destinationRoot(), { config: this.appConfig });

        //Copiado de carpetas ocultas
        this.fs.copyTpl(this.templatePath('.*'),this.destinationPath(),{ config: this.appConfig });
        
        this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'), { config: this.appConfig });

    }
    
    end(): void {

        this.log(siigosay("Execute 'make all' and Enjoy!!"))
    }
}

MicroserviceGenerator.yeomanInheritance(GolangMSGenerator)
