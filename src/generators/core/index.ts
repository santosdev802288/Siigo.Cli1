import rename from 'gulp-rename'
import path from 'path'
import {siigosay} from '@nodesiigo/siigosay'
import {getParameter, wizardsiigofile} from '../../utils/siigoFile'
import _ from 'lodash'

import {getChecksums} from '../../utils/checksum'
import {MicroserviceGenerator} from '../../utils/generator/microservice'


export default class CoreMSGenerator extends MicroserviceGenerator {
    appConfig: { name?: any; token?: string; nameCapitalize?: string; projectPrefix?: any} = {}

    constructor(args: any, opt: any) {
        super(args, opt)

        this.option('name', {
            description: 'Project name',
            default: this.defaultName,
            type: String
        })

        this.option('token', {
            description: 'Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens',
            type: String
        })

        this.option('project-prefix', {
            description: 'Use this option to replace the prefix Siigo in the file names',
            default:'Siigo',
            type: String
        })
    }

    initializing() {
        this.log(siigosay('Siigo Generator .Net Core.'))

        const message = 'For more information execute yo siigo:core --help'

    }

    async _doPrompting() {
        let tokenf = await getParameter('token');
        const updatetoken = this.options['token']
        if(tokenf == 'pending' || updatetoken != null ) tokenf = await wizardsiigofile(updatetoken);

        // Save config
        this.appConfig = {
            name: this.options['name'],
            token: tokenf.replace(' \n',''),
            nameCapitalize: _.upperFirst(this.options.name),
            projectPrefix: this.options['project-prefix'],
        }
        
    }

    _doWriting() {
        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((parsedPath: rename.ParsedPath) => {
                const prefixChart = 'ms-'
                parsedPath.dirname = parsedPath.dirname.includes(prefixChart) ?
                    parsedPath.dirname.replace(/(Microservice)/g, this.appConfig.name) :
                    parsedPath.dirname.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name))
                parsedPath.basename = parsedPath.basename.replace(/(Microservice)/g, _.upperFirst(this.appConfig.name))
                parsedPath.dirname = parsedPath.dirname.replace(/(Siigo)/g,this.appConfig.projectPrefix)
                parsedPath.basename = parsedPath.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix )
            })
        ]);

        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationPath('.'),
            {config: this.appConfig},
        );

        this.fs.copyTpl(
            this.templatePath('.*'),
            this.destinationPath('.'),
            {config: this.appConfig}
        );

        
    }

    install() {
        const checksums = getChecksums(this.destinationPath())
        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums)
    }

    end() {
        this.log(siigosay('Project Created!!'));
    }

}

MicroserviceGenerator.yeomanInheritance(CoreMSGenerator)
