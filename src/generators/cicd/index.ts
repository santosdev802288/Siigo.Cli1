import getDirectoriesRecursive from "../../utils/walkProjects"
import path from 'path'
import Generator =  require('yeoman-generator');
import rename from 'gulp-rename';
import {exec as spawn} from 'child_process';
import colorize from 'json-colorizer';
import {req} from "../../utils/required-tools"
import {siigosay} from '@nodesiigo/siigosay'

import upgradeFile from '../../utils/upgrade'
import {readTribesFile} from '../../utils/readTribes'
import autocomplete from '../../utils/autocomplete'
import createFile from '../../utils/createTribeDir'


export default class CicdGenerator extends Generator {
    appConfig: any;
    answers: any;
    tribes: any;
    upgrade: any;

    constructor(args: any, opt: any) {
        super(args, opt)

        req()

        const currentPath = path.basename(process.cwd())

        const paths = getDirectoriesRecursive(".")
            .filter((path: any) => !path.includes("Test"))
            .filter((path: any) => path.endsWith(".Api"))

        // optionals
        this.option("organization", {
            type: String,
            description: "Url of the organization in azure devops.",
            default: 'https://dev.azure.com/SiigoDevOps',
            alias: 'org'
        });

        this.option("project", {
            type: String,
            description: "Project in azure devops.",
            default: 'Siigo',
            alias: "p"
        });

        this.option("pipeline-name", {
            type: String,
            description: "Pipeline name in azure devops.",
            default: `${currentPath} CICD`,
            alias: 'pn'
        });

        this.option("folder", {
            type: String,
            description: "Name of the folder that will contain the pipeline.",
            default: currentPath,
            alias: 'f'
        });

        this.option("environment", {
            type: String,
            description: "Environment that has access to the cluster. https://dev.azure.com/SiigoDevOps/Siigo/_environments",
            default: `aks`,
            alias: 'e'
        });

        this.option("owner", {
            type: String,
            description: "Owner tag (whos execute the deployment test).",
            default: 'SiigoCli',
            alias: 'ow'
        });

        this.option("chart-version", {
            type: String,
            description: "Siigo helm chart version. https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags",
            default: '0.2.17',
            alias: 'cv'
        });

        // required
        this.option("dll", {
            type: String,
            description: "Project which the microservice starts. (Siigo.{Name}.Api). If --type is set to 'node', this value will be ignored.",
            default: paths.length ? paths[0] : null,
            alias: 'd'
        });

        this.option("project-name", {
            type: String,
            description: "Used in Helm chart name, docker image and sonar.",
        });

        this.option("namespace-k8s", {
            type: String,
            description: "Namespace in kubernetes configured in the environment.",
            alias: 'ns'
        });

        this.option("sonar-token", {
            type: String,
            description: "Sonar token to publish metrics. If --type is set to 'node', this value will be ignored.",
            alias: 'st',
            default: 'null'
        });

        this.option("type", {
            type: String,
            description: "Project type. (node, netcore, golang)",
            alias: 't',
            default: 'netcore'
        });
    }

    async initializing() {
        this.log(siigosay(`Siigo Generator CICD.`))
    }

    async prompting() {
        const tribePath = './tribes/'

        this.tribes = await readTribesFile()
        if (typeof this.tribes !== 'undefined' && this.tribes.length > 0) {
            this.upgrade = await this.prompt([
                {
                    type: "confirm",
                    name: "ok",
                    message: "Do you want to upgrade the tribes.json file?"
                }
            ]);

            if (this.upgrade.ok) {
                console.log('\nUpgrading tribes.json file...')
                await upgradeFile(tribePath, "tribes", "tribes.json")
                console.log('\nUpgrade Complete!!')
            }
        } else {
            await createFile(tribePath)
            this.tribes = await readTribesFile()
        }

        const select_tribe = await autocomplete(this.tribes)

        const message = "For more information execute yo siigo:cicd --help"

        if (!this.options['project-name'] || this.options['project-name'] === 'true')
            throw new Error("--project-name is required or it should not be empty.\n " + message)

        if (!this.options['namespace-k8s'] || this.options['namespace-k8s'] === 'true')
            throw new Error("--namespace-k8s || --ns is required or it should not be empty.\n " + message)

        if ((this.options['dll'] === 'null' || this.options['dll'] === 'true') && this.options['type'] === 'netcore' )
            throw new Error("--dll is required or it should not be empty.\n " + message)

        if ((this.options['chart-version'] === 'null' || this.options['chart-version'] === 'true'))
            throw new Error("--chart-version is required or it should not be empty. Visit https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart/tags \n " + message)

        const {organization, project, environment, folder, type} = this.options
        const namespace = this.options['namespace-k8s']
        this.appConfig = {
            organization,
            project,
            environment,
            namespace,
            folder,
            pipelineName: this.options['pipeline-name'],
            mainProject: this.options['dll'],
            name: this.options['project-name'],
            chartVersion: this.options['chart-version'],
            type,
            tagOwner: this.options['owner'],
            tagTribu: select_tribe.tribe
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
                type: "confirm",
                name: "ready",
                message: "Is the configuration correct?"
            }
        ]);

        if (!this.answers.ready)
            this.cancelCancellableTasks()
    }


    writing() {
        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename( (path: any) => {
                path.dirname = path.dirname.replace(/(chart)/g, this.appConfig.name)
                path.basename = path.basename.replace(/(chart)/g, this.appConfig.name)
            })
        ]);

        this.fs.copyTpl(
            this.templatePath(".docker"),
            this.destinationPath(".docker"),
            { config: this.appConfig }
        );

        this.fs.copyTpl(
            this.templatePath(""),
            this.destinationPath("."),
            { config: this.appConfig }
        );

        // Copy based on type
        if (this.options['type'] === 'golang'){
            this.fs.copyTpl(
                this.templatePath('.golang/.docker'),
                this.destinationPath('.docker'),
                { config: this.appConfig }
            );
        }
    }

    install() {
        this.spawnCommandSync('git', ['checkout','-b','cicd']);
        this.spawnCommandSync('git', ['add','-A']);
        this.spawnCommandSync('git', ['commit','-m','cicd configuration']);
        this.spawnCommandSync('git', ['push','origin','cicd']);
        
        this.spawnCommandSync('az', ['login']);
        this.spawnCommandSync('az', ['extension','add','--name', 'azure-devops']);
        spawn(`az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.project}'` );
        this.spawnCommandSync('az', ['pipelines','create','--name', this.appConfig.pipelineName, '--yml-path', 'azure-pipelines.yml', '--folder-path',this.appConfig.folder]);
    }
    
    end(){
        this.log(siigosay(`Enjoy! Dont forget merge cicd branch in dev.`))
    }
}
