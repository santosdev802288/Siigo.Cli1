import Generator from "yeoman-generator";
import colorize from 'json-colorizer'
import yaml from 'yaml'
import cronstrue from 'cronstrue'
import { siigosay } from '@nodesiigo/siigosay'
import { saveStatistic } from '../../utils/statistics/statistic';

interface MigrationOptions {
    domain: string;
    filePath: string
    context: string,
    replicas: number
    cron: string
}

interface MigrationYaml {
    verify: boolean
    multiTenantConfig: MTConfiguration
    jobConfig: JobConfig
    source: BdConfig
    sink: BdConfig
    sinkValidation: BdConfig
}

interface MTConfiguration {
    sourceRequiredMultiTenantConnections: boolean
    multiTenantId: string
    serverPriority: string
    all: boolean
}

interface JobConfig {
    options: object // Object?
}

interface BdConfig {
    asJson?: boolean
    saveMode?: string
    format: string
    verificationColumn: string
    options: object
}

export default class MigrationGenerator extends Generator {
    private appConfig: MigrationOptions
    private dataFile: Partial<MigrationYaml> = {}
    private answers: any


    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic('migration')


        // Domain target name
        this.option('domain', {
            type: String,
            description: 'Domain name.',
            default: '',
            alias: 'dn'
        });


        // Yaml file
        this.option('file-path', {
            type: String,
            description: 'Yaml configuration file path.',
            default: '',
            alias: 'fp'
        });


        // Context
        this.option('context', {
            type: String,
            description: "Cluster context",
            default: '',
            alias: 'c'
        });

        // Replicas
        this.option('replicas', {
            type: Number,
            description: "Replicas number",
            default: 1,
            alias: 'r'
        })


        // Cron expression for job
        this.option('cron', {
            type: String,
            description: "Cron expression",
            default: '',
            alias: 'ce'
        })


        this.appConfig = {
            domain: this.options.domain || this.options.dn,
            filePath: this.options['file-path'] || this.options.fp,
            context: this.options.context || this.options.c,
            replicas: this.options.replicas || this.options.r,
            cron: (this.options.cron || this.options.ce) || "",
        }

    }

    async initializing(): Promise<void> {
        this.log(siigosay(`Siigo generator Migration job.`))
        this._checkMandatory()

        // Check cron expression if is provided
        if (this.appConfig.cron) {            
            this._checkCronExpression(this.appConfig.cron)        
        }
    }


    // Pompting
    async prompting(): Promise<void> {
        const humanCron = this.appConfig.cron ? cronstrue.toString(this.appConfig.cron) : '';
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const json = JSON.stringify({...this.appConfig, cron: humanCron}, false, '\t')
        
        

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


    // Configuring
    async configuring(): Promise<void> {

        // Read file
        const data = this.fs.read(this.appConfig.filePath)

        // Parse yaml data        
        this.dataFile = yaml.parse(data)

        // Read yaml structure & validate.        
        this._checkYamlStructure();
        
        const basicConfig = { domainName: this.appConfig.domain, data: this._removeBreakLines(this._escapeQuotes(JSON.stringify(this.dataFile, null, ""))), replicas: this.appConfig.replicas }

        // Check template type.
        if (this.appConfig.cron) {
             // Write temp yaml                    
            this.fs.copyTpl(this.templatePath('spark-scheduled.yaml'), this.destinationPath('spark.yaml'), { ...basicConfig, schedule: this.appConfig.cron })            
            return
        } 

        // Write temp yaml                    
        this.fs.copyTpl(this.templatePath('spark-app.yaml'), this.destinationPath('spark.yaml'), { ...basicConfig })

    }

    
    install(): void {

        // Az login
        this.spawnCommandSync('az', ['login']);

        // Use context
        this.spawnCommandSync("kubectl", ["config", "use-context", this.appConfig.context]);

        // Current context
        this.spawnCommandSync("kubectl", ['config', 'current-context']);

        // Delete old jobs        
        this.spawnCommandSync("kubectl", ["delete", "-f", "./spark.yaml"])

        // Apply kubectl                      
        this.spawnCommandSync("kubectl", ["apply", "-f", "./spark.yaml"])

        // Delete temp yaml
        this.fs.delete('./spark.yaml')
    }


    _checkMandatory(): boolean {

        const message = 'For more information execute yo siigo:migration --help'
        const mandatoryMessage = 'is required or it should not be empty'

        if (!this.appConfig.domain || this.appConfig.domain === 'true')
            throw new Error(`--domain-name || --dn ${mandatoryMessage}.\n ${message}`)

        if (!this.appConfig.filePath || this.appConfig.filePath === 'true')
            throw new Error(`--file-path || --fp ${mandatoryMessage}.\n ${message}`)

        // Check yaml extension
        if (this.appConfig.filePath.split('.').pop() !== 'yaml')
            throw new Error(`--file-path must be a yaml file.\n ${message}`)

        if (!this.appConfig.context || this.appConfig.context === 'true')
            throw new Error(`--context || --c ${mandatoryMessage}.\n ${message}`)

        return true
    }



    _checkYamlStructure(): boolean {

        if (!this.dataFile.source) {
            throw new Error('source is required')
        }

        if(!this.dataFile.source.format) {
            throw new Error('source.format is required')
        }
 
        if(Object.keys(this.dataFile.source.options).length === 0){
            throw new Error('source.options is required')
        }
        
        if (!this.dataFile.sink) {
            throw new Error('sink is required')
        }

        if(!this.dataFile.sink.format) {
            throw new Error('sink.format is required')
        }
 
        if(Object.keys(this.dataFile.sink.options).length === 0){
            throw new Error('sink.options is required')
        }
        
        /*if (!this.dataFile.verify) {
            throw new Error('verify is required')
        }*/

        /*if (!this.dataFile.sinkValidation) {
            throw new Error('sinkValidation is required')
        }*/
        /*if (!this.dataFile.jobConfig) {
            throw new Error('jobConfig is required')
        }

        if (!this.dataFile.multiTenantConfig) {
            throw new Error('multiTenantConfig is required')
        }*/
            
        return true
    }


    _removeBreakLines(str: string): string {
        return str.replace(/(\r\n|\n|\\n|\r)/gm, "")
    }

    _escapeQuotes(str: string): string {
        // eslint-disable-next-line
        return str.replace(/(["'])/g, "\\\$1")
    }

    _checkCronExpression(cronExpr: string) {
        const cronregex = new RegExp(/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/);
        if (!cronregex.test(cronExpr)) {
            throw new Error('Cron expression is not valid.')
        }
    }


    end(): void {
        this.log(siigosay(`Migration job has been created`))
    }
}


