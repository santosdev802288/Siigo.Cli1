import Generator from "yeoman-generator";
import colorize from 'json-colorizer'
import {siigosay} from '@nodesiigo/siigosay'
import {saveStatistic} from '../../utils/statistics/statistic';

interface MigrationOptions {
    domain: string;
    context: string
}

export default class MigrationDelete extends Generator {

    private answers: any
    private appConfig: MigrationOptions

    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic('migration-delete')

         // Domain name
         this.option('domain', {
            type: String,
            description: 'Domain name.',
            default: '',
            alias: 'dn'
        });

        // Context
        this.option('context', {
            type: String,
            description: "Cluster context",
            default: '',
            alias: 'c'
        });

        this.appConfig = {               
            context: this.options.context || this.options.c, 
            domain: this.options.domain || this.options.dn,            
        }
    }

    async initializing(): Promise<void> {
        this.log(siigosay(`Siigo scheduled migration job delete.`))
        this._checkMandatory()
    }

    // Pompting
    async prompting(): Promise<void> {

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
        ])

        if (!this.answers.ready) {
            throw new Error('Configuration is not correct. Please, review the configuration and try again.')
        }

    }


    async install(){
    
        // Az login
        this.spawnCommandSync('az', ['login']);

        // Use context
        this.spawnCommandSync("kubectl", ["config", "use-context", this.appConfig.context]);

        // Current context
        this.spawnCommandSync("kubectl", ['config', 'current-context']);

        // Delete scheduled job
        this.spawnCommandSync("kubectl", ["delete", "scheduledsparkapplications.sparkoperator.k8s.io", this.appConfig.domain, "-n", "default"]);
    }

    end(): void {
        this.log(siigosay(`Scheduled migration job has been deleted`))
    }


    _checkMandatory(): boolean {

        const message = 'For more information execute yo siigo:migration --help'
        const mandatoryMessage = 'is required or it should not be empty'

        if (!this.appConfig.domain || this.appConfig.domain === 'true')
            throw new Error(`--domain-name || --dn ${mandatoryMessage}.\n ${message}`)

        if (!this.appConfig.context || this.appConfig.context === 'true')
            throw new Error(`--context || --c ${mandatoryMessage}.\n ${message}`)

        return true
    }

}


