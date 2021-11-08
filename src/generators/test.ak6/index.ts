import colorize from 'json-colorizer'
import {siigosay} from '@nodesiigo/siigosay'
import {getAllParametersSiigo, wizardsiigofile} from '../../utils/siigoFile'
import {TestingGenerator} from '../../utils/generator/testing'
import {GeneratorOptions} from 'yeoman-generator'
import {exec as spawn} from "child_process";
import path from "path";
import { saveStatistic } from '../../utils/statistics/statistic'

interface Ak6Options extends GeneratorOptions {
    name: string;
}

type AppConfig = {
    description: string;
    author: string;
    name: string;
    token: string;
    project: string;
    organization: string
}

export default class Ak6TestingGenerator extends TestingGenerator<Ak6Options> {

    private appConfig: Partial<AppConfig> = {}

    constructor(args: any, options: Ak6Options) {
        super(args, options)
        saveStatistic('test-ak6')
        // optionals
        this.option('name', {
            type: String,
            description: 'Name project.',
            default: this.defaultName,
            alias: 'pn'
        });

        this.option('organization', {
            type: String,
            description: 'Url of the organization in azure devops.',
            default: 'https://dev.azure.com/SiigoDevOps',
            alias: 'org'
        })

        this.option('project', {
            type: String,
            description: 'Project in azure devops.',
            default: 'Siigo',
            alias: 'p'
        })

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

        const {description, author, project, organization } = this.options
        this.appConfig = {
            description,
            organization,
            author,
            project,
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
            this.templatePath('.docker/ak6'),
            this.destinationPath(`.docker/${this.appConfig.name}`),
            { config: this.appConfig },
        )
        
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

    install(){
        super.spawnCommandSync('git', ['add','-A'])
        super.spawnCommandSync('git', ['commit','-m','init project test'])
        super.spawnCommandSync('git', ['push','origin','master'])

        const currentPath = path.basename(process.cwd())

        super.spawnCommandSync('az', ['login'])
        super.spawnCommandSync('az', ['extension','add','--name', 'azure-devops'])
        spawn(`az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.name}'` )
        this.spawnCommandSync('az',
            ['pipelines','create','--name', currentPath,
                '--yml-path', 'azure-pipelines.yml',
                '--folder-path',currentPath,
                "--repository-type", "tfsgit",
                "--project", String(this.appConfig.project),
                "--repository" , currentPath,
            ]
        )
    }

    end() {
        this.log(siigosay('Enjoy!!'))
    }
}

TestingGenerator.yeomanInheritance(Ak6TestingGenerator)
