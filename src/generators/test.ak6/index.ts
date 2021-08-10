import os  from 'os'
import colorize from'json-colorizer'
import {siigosay} from'@nodesiigo/siigosay'
import { getAllParametersSiigo, wizardsiigofile } from '../../utils/siigoFile'
import { TestingGenerator } from '../../utils/generator/testing'
import { GeneratorOptions } from 'yeoman-generator'


interface Ak6Options extends GeneratorOptions {
    name: string;
}


export default class Ak6TestingGenerator extends TestingGenerator<Ak6Options> {
    appConfig: { description?: any; author?: any; name?: any; token?: any } = {}

    constructor(args: any, options: Ak6Options) {
        super(args, options)

        // optionals
        this.option('name', {
            type: String,
            description: 'Name project.',
            default: this.defaultName,
            alias: 'pn'
        });
    }

    initializing(): void{
        this.log(siigosay('Siigo AK6 Generator.'))
    }

    async _doPrompting(): Promise<void> {
        const message = 'For help execute "yo siigo:test.ak6 --help".';

        const siigoParams = await getAllParametersSiigo();

        if (siigoParams.token === 'pending' || this.options['personal-token'] != null) {
            this.options['personal-token'] = await wizardsiigofile(this.options['personal-token']);
        }else {
            this.options['personal-token'] = siigoParams.token
        }

        ['name'].forEach(option => {
            if (this.options[option] === 'true' || !this.options[option])
                throw new Error(`${option} is required.\n${message}`)
        });

        const {description, author} = this.options
        this.appConfig = {
            description,
            author,
            name: this.options.name.toLowerCase(),
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
        
        this.fs.copyTpl(
            this.templatePath(''),
            this.destinationRoot(),
            {config: this.appConfig},
        );
        
        // Copy dotfiles
        this.fs.copy(
            this.templatePath('.dotfiles/.*'),
            this.destinationRoot(),
            {},
            {config: this.appConfig}
        );
    }

    end() {
        this.log(siigosay('Execute \'make all\' and Enjoy!!'))
    }
}

TestingGenerator.yeomanInheritance(Ak6TestingGenerator)
