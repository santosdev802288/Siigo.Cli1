import Generator from "yeoman-generator";
import colorize from 'json-colorizer'
import {siigosay} from '@nodesiigo/siigosay'
import {saveStatistic} from '../../utils/statistics/statistic';
import {getAllParametersSiigo} from '../../utils/siigoFile'

enum Options {
    SQL = "SQL",
    KAFKA = "KAFKA",
    MONGO = "MONGO",
    CASSANDRA = "CASSANDRA",
}

enum Formats {
    SQL = "jdbc",
    KAFKA = "kafka",
    MONGO = "com.mongodb.spark.sql.DefaultSource",
    CASSANDRA = "org.apache.spark.sql.cassandra",

}

interface PromptsOptions {
    source: any
    sink: any,
    sinkValidation?: any,
    multiTenantConfig?: any,

    sinkValidationConfirm: any
    multiTenantConfirm?: any
}

interface BdConfig {
    asJson?: boolean
    saveMode?: string
    format: string
    verificationColumns: string[]
    options: { [option: string]: string }
}


const KafkaConfig: BdConfig = {
    asJson: true,
    saveMode: "append",
    format: Formats.KAFKA,
    verificationColumns: ["ProductID", "TenantIdd"],
    options: {
        "kafka.bootstrap.servers": "qakafka.siigo.com:9094",
        "topic": "example"
    }
}

const CassandraConfig: BdConfig = {
    format: Formats.CASSANDRA,
    verificationColumns: ["ProductID", "TenantIdd"],
    options: {
        "table": "words",
        "keyspace": "test",
    }
}

const MongoConfig: BdConfig = {
    saveMode: "append",
    format: Formats.MONGO,
    verificationColumns: ["ProductID", "TenantIdd", "Description"],
    options: {
        "uri": "mongodb+srv://siigo-catalog-qa-dbProduct:ZS8BfbGpqa7PCvsp@siigo-catalog-qa.u7fhi.azure.mongodb.net/dbProduct?retryWrites=true&w=majority",
        "database": "dbProduct",
        "collection": "Product2",
        // "pipeline": ""
    }
}

const SqlConfig: BdConfig = {
    format: Formats.SQL,
    verificationColumns: ["ProductID", "TenantIdd", "Description"],
    options: {
        dbtable: "(select *, CONVERT(VARCHAR(max),TenantId,1) TenantIdd from Product) productsTemp"
    }
}


export default class MigrationTemplateGenerator extends Generator {

    private answers: any
    private appConfig: object

    private userOptions: Partial<PromptsOptions> = {}

    constructor(args: any, opt: any) {
        super(args, opt)
        saveStatistic('migration-template')
        this.appConfig = {}
    }

    async initializing(): Promise<void> {
        this.log(siigosay(`Siigo generator Migration job template.`))
    }

    // Pompting
    async prompting(): Promise<void> {

        await this._promptsSource();

        await this._promtsSink();

        await this._promptsSinkValidation();

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const json = JSON.stringify(this.userOptions, false, '\t')

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

        const siigoParams = await getAllParametersSiigo();

        const yamlParams = {
            user: siigoParams.name,
            tribe: siigoParams.tribe,
            validation: this.userOptions.sinkValidationConfirm?.confirm,
            multitenant: this.userOptions.multiTenantConfirm?.confirm,
            source: this._getBdConfig(this.userOptions.source.type),
            sink: this._getBdConfig(this.userOptions.sink.type),
            sinkValidation: this.userOptions.sinkValidation?.type ? this._getBdConfig(this.userOptions.sinkValidation.type) : ""
        }

        // Write yaml
        this.fs.copyTpl(this.templatePath('migration.yaml'), this.destinationPath('migration.yaml'), yamlParams)
    }


    async _promptsSource(): Promise<void> {

        this.userOptions.source = await this.prompt([{
            type: 'list',
            name: 'type',
            message: 'Select the source',
            choices: Object.values(Options).filter(option => option !== Options.KAFKA),
        }])

        if (this.userOptions.source.type == Options.SQL) {
            this.userOptions.multiTenantConfirm = await this.prompt([{
                type: 'confirm',
                name: 'confirm',
                message: 'The source requires multi tentant connection?'
            }])
        }
    }


    async _promtsSink(): Promise<void> {
        this.userOptions.sink = await this.prompt([{
            type: 'list',
            name: 'type',
            message: 'Select the target (sink)',
            choices: Object.values(Options),
        }])
    }


    async _promptsSinkValidation(): Promise<void> {

        this.userOptions.sinkValidationConfirm = await this.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'Do yo want to validate the target (sink)?'
        }])

        if (this.userOptions.sinkValidationConfirm.confirm == true) {
            this.userOptions.sinkValidation = await this.prompt([{
                type: 'list',
                name: 'type',
                message: 'Select the target to validate (sink - validation)',
                choices: Object.values(Options).filter(option => option !== Options.KAFKA),
            }])
        }
    }


    _getBdConfig(type: Options): BdConfig {
        switch (type) {
            case Options.KAFKA:
                return KafkaConfig
            case Options.CASSANDRA:
                return CassandraConfig
            case Options.MONGO:
                return MongoConfig
            case Options.SQL:
                return SqlConfig
        }
    }


    end(): void {
        this.log(siigosay(`Migration template job has been created`))
    }
}


