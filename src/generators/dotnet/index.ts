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
        projectPrefix: string;
        token: string;
        type: ServerType;
        userSiigo: string;
        nameDev: string;
    };

    constructor(args: any, opt: any) {
        super(args, opt);

        toolsRequired(TOOLS.BUF)(TOOLS.GIT)(TOOLS.TELEPRESENCE)

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
            }
        ])
        saveStatistic('dotnet', {type: response.type})
        let tokenf = objParameters.token;
        const updatetoken = this.options['token'];
        if (tokenf == 'pending' || updatetoken != null)
            tokenf = await wizardsiigofile(updatetoken);
        this.appConfig = {
            name: _.lowerCase(this.options['name']),
            nameCapitalize: _.upperFirst(this.options['name']),
            type: response.type,
            userSiigo: (objParameters as any).user,
            nameDev: (objParameters as any).name,
            token: _.defaultTo(tokenf, ''),
            projectPrefix: this.options['project-prefix'],
        }
    }

    _doWriting(): void {

        // replace contract label with ejs templating
        const optionsLowwerCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /contract/g,
            to: '<%= config.name %>',
        };

        const optionsUpperCase = {
            files: [`${this.templatePath(this.appConfig.type)}/**/*.*`, `${this.templatePath(this.appConfig.type)}/**`],
            from: /Contract/g,
            to: '<%= config.nameCapitalize %>',
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
            to: '<%= config.nameCapitalize %>',
        };

        replace.sync(optionsLowwerCase)
        replace.sync(optionsUpperCase)
        replace.sync(optionsMicroserviceLowerCase)
        replace.sync(optionsMicroserviceUpperCase)

        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((parsetPath) => {

                parsetPath.basename = parsetPath.basename.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name));
                parsetPath.basename = parsetPath.basename.replace(/(Contract)/g, _.upperFirst(this.appConfig.name));
                parsetPath.basename = parsetPath.basename.replace(/(microservice)/g, this.appConfig.name);
                parsetPath.basename = parsetPath.basename.replace(/(contract)/g, this.appConfig.name);
                parsetPath.basename = parsetPath.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix);

                parsetPath.dirname = parsetPath.dirname.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name));
                parsetPath.dirname = parsetPath.dirname.replace(/(Contract)/g, _.upperFirst(this.appConfig.name));
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
        shell.exec("buf generate")
        shell.exec("dotnet run")


    }
}

MicroserviceGenerator.yeomanInheritance(DotnetMSGenerator)
