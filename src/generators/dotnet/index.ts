import rename = require('gulp-rename');
import path from 'path';
import {siigosay} from '@nodesiigo/siigosay';
import _ from 'lodash'
import {default as replace} from 'replace-in-file';
import {getAllParametersSiigo, wizardsiigofile} from '../../utils/siigoFile';
import {getChecksums} from '../../utils/checksum';
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import {saveStatistic} from '../../utils/statistics/statistic';
import {ServerType} from './enums';
import shell from 'shelljs';
import {TOOLS, toolsRequired} from '../../utils/required-tools';

const ServerTypes = Object.values(ServerType)

export default class DotnetMSGenerator extends MicroserviceGenerator {

    appConfig !: {
        name: string;
        nameCapitalize: string;
        nameUpper: string;
        projectPrefix: string;
        token: string;
        type: ServerType;
        userSiigo: string;
        nameDev: string;
        domain: string;
        domainUpper: string;
    };

    constructor(args: any, opt: any) {
        super(args, opt);

        toolsRequired([TOOLS.BUF, TOOLS.GIT])

        this.option('name', {
            description: 'Project name',
            default: this.defaultName,
            type: String
        });
        this.option('project-prefix', {
            description: 'Use this option to replace the prefix Siigo in the file names',
            default: 'Siigo',
            type: String
        });
        this.option('domain', {
            description: 'Use this option to replace the domain',
            default: this.defaultName,
            type: String
        });
    }

    async initializing() {
        this.log(siigosay('Siigo Generator .Net Core.'));
    }

    async _doPrompting() {
        const objParameters = await getAllParametersSiigo();
        const response = await this.prompt([
            {
                type: 'list',
                name: 'type',
                message: '¿what do you want to generate?',
                choices: ServerTypes,
                default: ServerTypes.indexOf(ServerType.MICROSERVICE_DDD)
            },
            {
                type: 'string',
                name: 'domain',
                message: '¿What is the name of your Domain?',
            }
        ])
        saveStatistic('dotnet', {type: response.type})
        let tokenf = objParameters.token;
        const updatetoken = this.options['token'];
        if (tokenf == 'pending' || updatetoken != null)
            tokenf = await wizardsiigofile(updatetoken);

        const name = this.options['name'].toLowerCase();
        const nameUpper = _.upperFirst(this.options['name'])
        const nameCapitalize =  _.upperFirst(name); 
        const domain = response.domain.toLowerCase();
        const domainUpper = _.upperFirst(domain)
        
        this.appConfig = {
            name: name,
            nameUpper: nameUpper,
            nameCapitalize: nameCapitalize,
            type: response.type,
            userSiigo: (objParameters as any).user,
            nameDev: (objParameters as any).name,
            token: _.defaultTo(tokenf, ''),
            projectPrefix: this.options['project-prefix'],
            domain:domain,
            domainUpper: domainUpper,
        }

    }

    _doWriting(): void {

        // replace contract label with ejs template
        const optionsLowwerCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /contract/g,
            to: '<%= config.domain %>',
        };

        const optionsUpperCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /Contract/g,
            to: '<%= config.domainUpper %>',
        };

        // replace contract label with ejs templating
        const optionsMicroserviceLowerCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /microservice/g,
            to: '<%= config.name %>',
        };

        const optionsMicroserviceUpperCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /Microservice/g,
            to: '<%= config.nameUpper %>',
        };

        const optionsNugetToken = {
            files:[`${this.templatePath(this.appConfig.type)}/nuget.config`],
            from: /<add\s{0,}key="ClearTextPassword"\s{0,}value=".*"\s{0,}\/>/g,
            to:`<add key="ClearTextPassword" value="${this.appConfig.token}" />`
        }

        replace.sync(optionsLowwerCase)
        replace.sync(optionsUpperCase)
        replace.sync(optionsMicroserviceLowerCase)
        replace.sync(optionsMicroserviceUpperCase)
        replace.sync(optionsNugetToken)

        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((parsetPath) => {

                parsetPath.basename = parsetPath.basename.replace(/(Microservice)/g, this.appConfig.nameUpper);
                parsetPath.basename = parsetPath.basename.replace(/(Contract)/g, this.appConfig.domainUpper);
                parsetPath.basename = parsetPath.basename.replace(/(microservice)/g, this.appConfig.name);
                parsetPath.basename = parsetPath.basename.replace(/(contract)/g, this.appConfig.domain);
                parsetPath.basename = parsetPath.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix);

                parsetPath.dirname = parsetPath.dirname.replace(/(Microservice)/g, this.appConfig.nameUpper);
                parsetPath.dirname = parsetPath.dirname.replace(/(Contract)/g, this.appConfig.nameUpper);
                parsetPath.dirname = parsetPath.dirname.replace(/(contract)/g, this.appConfig.name);
                parsetPath.dirname = parsetPath.dirname.replace(/(Siigo)/g, this.appConfig.projectPrefix);

            })
        ]);

        const checksums = getChecksums(this.destinationPath());
        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums);

        // copy template into current folder
        this.fs.copyTpl(
            [
                this.templatePath(this.appConfig.type + '/'),
                `!${this.templatePath(this.appConfig.type + '/.git/')}`,
                `!${this.templatePath(this.appConfig.type + '/.docker/')}`,
                `!${this.templatePath(this.appConfig.type + '/azure-pipelines.yml')}`,
            ],
            this.destinationPath(),
            {config: this.appConfig},
            {},
            {globOptions: {dot: true}}
        );

    }

    end() {
        this.log(siigosay('Project Created!!'));
        this.log('Starting project...');

        // start project
        shell.cd("Siigo." + this.appConfig.nameCapitalize + ".Api")

        if (this.appConfig.type === ServerType.MICROSERVICE_DDD) 
            shell.exec("buf generate")
        
        shell.exec("dotnet run")
    }
}

MicroserviceGenerator.yeomanInheritance(DotnetMSGenerator)
