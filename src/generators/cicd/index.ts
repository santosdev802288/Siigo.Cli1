import getDirectoriesRecursive from '../../utils/walkProjects'
import path from 'path'
import Generator = require('yeoman-generator');
import {exec as spawn} from 'child_process'
import colorize from 'json-colorizer'
import {req} from '../../utils/required-tools'
import {siigosay} from '@nodesiigo/siigosay'
import shell from 'shelljs'
import {getProjects} from '../../utils/gitmanager'
import {registerAutocomplete} from '../../utils/autocomplete'
import {getParameter} from '../../utils/siigoFile'
import chalk from 'chalk'
import _ from 'lodash'
import {saveStatistic} from '../../utils/statistics/statistic'

import {lastChartVersion, writeChart} from '../../utils/chart'
import {isTestEnv} from '../../utils/environment/node';
import {ServerType} from "../dotnet/enums";


const prefixRepo = 'Siigo.Microservice.'
const eSiigoPrefixRepo = 'ESiigo.Microservice.'


enum TypeEnum {
    GOLANG = 'golang',
    NET_5 = 'net5',
    NET_6 = 'net6',
    NETCORE_3 = 'netcore',
    NODE = 'node',
}
const TYPE_LIST = Object.keys(TypeEnum).map(k => TypeEnum[k as keyof typeof TypeEnum])


interface CicdOptions extends Generator.GeneratorOptions {
    'chart-version': string;
    'skip-install-step': boolean;
    type: TypeEnum;
}


export default class CicdGenerator extends Generator<CicdOptions> {
    appConfig: any;
    answers: any;
    token = '';

    constructor(args: any, opt: CicdOptions) {
        super(args, opt)
        saveStatistic('cicd')
        req()

        const currentPath = path.basename(process.cwd())

        const paths = getDirectoriesRecursive('.')
            .filter(filepath => !filepath.includes('Test'))
            .filter(filepath => filepath.endsWith('.Api'))
            .map(filepath => path.basename(filepath))

        // optionals

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

        this.option('pipeline-name', {
            type: String,
            description: 'Pipeline name in azure devops.',
            default: `${currentPath} CICD`,
            alias: 'pn'
        })

        this.option('skip-install-step', {
            type: Boolean,
            description: 'Saltar el paso de instalación.',
            default: false,
        })

        this.option('folder', {
            type: String,
            description: 'Name of the folder that will contain the pipeline.',
            default: currentPath,
            alias: 'f'
        })

        this.option('environment', {
            type: String,
            description: 'Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments',
            default: 'aks',
            alias: 'e'
        })

        this.option('owner', {
            type: String,
            description: 'Owner tag (whos execute the deployment test).',
            default: 'SiigoCli',
            alias: 'ow'
        })

        this.option('chart-version', {
            type: String,
            description: 'Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags',
            default: lastChartVersion(),
            alias: 'cv'
        })

        // required
        this.option('dll', {
            type: String,
            description: 'Project which the microservice starts (Siigo.{Name}.Api). Only for .Net types.',
            default: paths.length ? paths[0] : null,
            alias: 'd'
        })

        this.option('project-name', {
            type: String,
            description: 'Used in Helm chart name, docker image and sonar.',
        })

        this.option('namespace-k8s', {
            type: String,
            description: 'Namespace in kubernetes configured in the environment.',
            alias: 'ns'
        })

        this.option('sonar-token', {
            type: String,
            description: 'Sonar token to publish metrics. If --type is set to \'node\', this value will be ignored.',
            alias: 'st',
            default: 'null'
        })

        this.option('type', {
            type: String,
            description: `Project type, one of: ${TYPE_LIST}.`,
            alias: 't',
            default: TypeEnum.NET_6
        })
    }

    async initializing(): Promise<void> {
        this.log(siigosay('Siigo Generator CICD.'))
        this.token = await getParameter('token')
        const currentPath = path.basename(process.cwd())
        const createPrefix = !currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo)
        if (!createPrefix) {
            const projectNamePath = currentPath.split('.')
            const tempName = projectNamePath.pop()
            this.options['project-name'] = tempName
            this.options['dll'] = projectNamePath[0] + '.' + tempName + '.' + 'Api'
        }
        registerAutocomplete(this)
    }

    async prompting(): Promise<void> {
        // TODO update tribes file
        const projects = await getProjects(this.token)
        const nameProjects = Object.keys(projects)
        const response = await this.prompt([
            {
                type: 'list',
                name: 'project',
                message: 'In which Project?',
                choices: nameProjects,
                default: 'Siigo',
            },
            {
                type: 'list',
                name: 'type',
                message: 'Project type, one of:',
                choices: TYPE_LIST,
                default: 'golang',
            },
            {
                type: 'input',
                name: 'namespace',
                alias: 'ns',
                message: '¿In which namespace in kubernetes?'
            }
        ])

        const namespace = response.namespace;
        const type = response.type;

        const message = 'For more information execute yo siigo:cicd --help'
        const notEmptyMessage = 'is required or it should not be empty'

        if (!this.options['project-name'] || this.options['project-name'] === 'true')
            throw new Error(`--project-name ${notEmptyMessage}.\n ${message}`)

        /*if (!this.options['namespace-k8s'] || this.options['namespace-k8s'] === 'true')
            throw new Error(`--namespace-k8s || --ns ${notEmptyMessage}.\n ${message}`)*/

        if ((this.options['dll'] === 'null' || this.options['dll'] === 'true') && this.options['type'] === 'netcore')
            throw new Error(`--dll ${notEmptyMessage}.\n ${message}`)

        if ((this.options['chart-version'] === 'null' || this.options['chart-version'] === 'true'))
            throw new Error(`--chart-version ${notEmptyMessage}. Visit https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags \n ${message}`)

        const {organization, environment, folder} = this.options

        //const namespace = this.options['namespace-k8s']

        const owner = await getParameter('user')
        const tribe = await getParameter('tribe')
        const group = await getParameter('group')
        this.appConfig = {
            organization,
            project: response.project,
            environment,
            namespace,
            folder,
            pipelineName: this.options['pipeline-name'],
            mainProject: this.options['dll'],
            name: this.options['project-name'].toLowerCase(),
            chartVersion: this.options['chart-version'],
            type,
            tagOwner: owner.split('@')[0],
            tagTribu: tribe,
            tagGroup: group,
            pod: {
                healthPath: '/health'
            }
        }

        const json = JSON.stringify(this.appConfig, null, '\t')
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

        if (!this.answers.ready)
            this.cancelCancellableTasks()
    }


    async writing(): Promise<void> {

        const chartFolder = 'ms-' + this.appConfig.name
        this.fs.copyTpl(
            [this.templatePath(), this.templatePath('.docker')],
            this.destinationPath(''),
            {config: this.appConfig},
            {},
            {
                processDestinationPath: (filePath) => filePath.replace(/(chart)/g, chartFolder),
                globOptions: {dot: true}
            },
        )

        this.fs.commit(async error => {
            if (error) this.log(`Error: ${error}`)
        })
        await writeChart(this.token, chartFolder, this.appConfig.tagOwner, this.appConfig.tagTribu, this.appConfig.tagGroup, this.appConfig.type)

    }

    install(): void {
        if (this.options['skip-install-step']) {
            return
        }
        shell.exec('git remote update origin --prune', {silent: true})
        const branchsGit = (shell.exec('git branch -r', {silent: true}).stdout).split('\n').filter(value => value.length)
        let flagCicd = false
        if (branchsGit != null && !_.isEmpty(branchsGit)) {
            branchsGit.forEach((branch: string) => {
                if (branch.includes('cicd')) flagCicd = true
            })
        }
        if (!flagCicd) {
            this.spawnCommandSync('git', ['checkout', '-b', 'cicd'])
            this.spawnCommandSync('git', ['add', '-A'])
            this.spawnCommandSync('git', ['commit', '-m', 'cicd configuration'])
            this.spawnCommandSync('git', ['push', 'origin', 'cicd'])
        } else {
            console.log(chalk.yellow('WARNING!!! '))
            console.log(chalk.yellow('The branch cicd is already created!'))
        }
        const branchsPipeline: any = (shell.exec(`az pipelines list --organization https://dev.azure.com/SiigoDevOps --project "${this.appConfig.project}" --name "${this.appConfig.pipelineName}"`, {silent: true}).stdout)
        if (branchsPipeline.length < 5) {
            this.spawnCommandSync('az', ['login'])
            this.spawnCommandSync('az', ['extension', 'add', '--name', 'azure-devops'])
            spawn(`az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.project}'`)
            this.spawnCommandSync('az', ['pipelines', 'create', '--name', this.appConfig.pipelineName, '--yml-path', 'azure-pipelines.yml', '--folder-path', this.appConfig.folder])
        } else {
            console.log(chalk.yellow('WARNING!!! '))
            console.log(chalk.yellow(`The Pipeline ${this.appConfig.pipelineName} is already created!`))
        }
    }

    end(): void {
        this.log(siigosay('Enjoy! Dont forget merge cicd branch in dev.'))
    }
}
