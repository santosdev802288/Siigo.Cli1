import os  from 'os'
import path  from 'path'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import {MicroserviceGenerator} from '../../utils/generator/microservice'
import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile'

import Generator = require('yeoman-generator');
// @ts-expect-error FIXME: How to fix this?
import install = require('yeoman-generator/lib/actions/install')
import _extend from 'lodash/extend'
_extend(Generator.prototype, install)


export default class NodeMSGenerator extends MicroserviceGenerator {
    appConfig: { description?: any; author?: any; name?: any } = {}

    constructor(args: any, opt: any) {        
        super(args, opt)

        const currentPath = path.basename(process.cwd())

        // optionals
        this.option('project-name', {
            type: String,
            description: 'Name project.',
            default: currentPath,
            alias: 'pn'
        });

        this.option('description', {
            type: String,
            description: 'Description project.',
            default: 'This is a Microservice from Siigo :)',
            alias: 'd'
        });

        this.option('author', {
            type: String,
            default: os.userInfo().username,
            alias: 'a'
        });

        this.option('skip-install', {
            type: String,
            default: false,
            description: 'Avoid Installing dependencies automatically.'
        });

    }

    async initializing(): Promise<void> {
        this.log(siigosay('Siigo Generator NodeJS.'))

        const siigoParams = await getAllParametersSiigo();

        if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
            this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
        }else {
            this.options['personal-token'] = siigoParams.token
        }
        const {description, author} = this.options
        this.appConfig = {
            description,
            author: siigoParams.user,
            name: this.options['project-name']
        };
    }

    async _doPrompting(): Promise<void> {
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

        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationPath('.'),
            {config: this.appConfig}
        );

        this.fs.copyTpl(
            this.templatePath('.*'),
            this.destinationPath('.'),
            {config: this.appConfig}
        );
    }

    end(): void {
        this.log(siigosay('Enjoy!!'))
    }
}

MicroserviceGenerator.yeomanInheritance(NodeMSGenerator)
