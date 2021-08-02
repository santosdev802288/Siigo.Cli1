import getDirectoriesRecursive from "../../utils/walkProjects"
import path from 'path'
import Generator =  require('yeoman-generator');
import {exec as spawn} from 'child_process';
import colorize from 'json-colorizer';
import {req} from "../../utils/required-tools"
import {siigosay} from '@nodesiigo/siigosay'
import shell from "shelljs";
import {readTribesFile} from '../../utils/readTribes'
import { autocompleteTribe, registerAutocomplete } from '../../utils/autocomplete'
import fetch from "node-fetch";
import fs from "fs";
import { getParameter} from '../../utils/siigoFile';


async function writeChart(token:any, projectName:string,tagOwner:string ,tagTribu: string) {
    const b64 = Buffer.from(token.trim() + ":").toString('base64');
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + b64,
        },
        redirect: 'follow'
    };
    // @ts-expect-error -migrate(2345) FIXME: Argument of type '{ method: string; headers: { Aut... Remove this comment to see the full error message
    const response = await fetch("https://dev.azure.com/SiigoDevOps/Siigo/_apis/git/repositories/Siigo.Chart/items?path=values.yaml&download=true&api-version=6.0", requestOptions);
    //// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Response'... Remove this comment to see the full error message
    let stringResponse:string = await response.text();
    stringResponse = stringResponse.replace("com: {}",
        `com:
            tribu: ${tagOwner}
            owner: ${tagTribu}`);

    try {
        fs.writeFile(`./.docker/${projectName}/values.yaml`, stringResponse, function (err) {
            if (err) {
                console.log(err);
                throw err
            }
            console.log('value.yaml is created successfully.');
        });
    }
    catch (err) {
        console.log(("Token no es valido" as any).red);
    }
}

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
        registerAutocomplete(this)
    }

    async prompting() {
        // TODO update tribes file
        this.tribes = await readTribesFile()

        const select_tribe = await this.prompt([autocompleteTribe(this.tribes)])

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
        console.log("Obteniendo la ultima version de Chart!");
        let resGit: any = (shell.exec(`git ls-remote --refs --tags --sort=v:refname https://dev.azure.com/SiigoDevOps/Siigo/_git/Siigo.Chart`,{silent: true}).stdout).split('/').pop();
        resGit = resGit.replace("\n","");
        this.appConfig = {
            organization,
            project,
            environment,
            namespace,
            folder,
            pipelineName: this.options['pipeline-name'],
            mainProject: this.options['dll'],
            name: this.options['project-name'].toLowerCase(),
            chartVersion: resGit,
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


    async writing() {

        this.fs.copyTpl(
            this.templatePath(".docker"),
            this.destinationPath(".docker"),
            { config: this.appConfig },
            {},
            {
                processDestinationPath: (filePath) => {
                    return filePath.replace(/(chart)/g, this.appConfig.name)
                }
            },
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
                { config: this.appConfig },
                {},
                {
                    processDestinationPath: (filePath) => {
                        return filePath.replace(/(chart)/g, this.appConfig.name)
                    }
                },
            );
        } else {
            const token = await getParameter("token");
            this.fs.commit(async error => {
                if(error) this.log(`Error: ${error}`)
            })
            await writeChart(token,this.appConfig.name,this.appConfig.tagOwner,this.appConfig.tagTribu)
        }
    }

    async install() {
        shell.exec('git remote update origin --prune',{silent: true})
        const branchsGit: any = (shell.exec('git branch -r',{silent: true}).stdout).split('\n');
        let flagCicd = false;
        branchsGit.forEach((branch: string) => { if(branch.includes('cicd')) flagCicd = true;});
        if(!flagCicd){
            this.spawnCommandSync('git', ['checkout','-b','cicd']);
            this.spawnCommandSync('git', ['add','-A']);
            this.spawnCommandSync('git', ['commit','-m','cicd configuration']);
            this.spawnCommandSync('git', ['push','origin','cicd']);
        }

        this.spawnCommandSync('az', ['login']);
        this.spawnCommandSync('az', ['extension','add','--name', 'azure-devops']);
        spawn(`az devops configure --defaults organization='${this.appConfig.organization}' project='${this.appConfig.project}'` );
        this.spawnCommandSync('az', ['pipelines','create','--name', this.appConfig.pipelineName, '--yml-path', 'azure-pipelines.yml', '--folder-path',this.appConfig.folder]);
    }
    
    end(){
        this.log(siigosay(`Enjoy! Dont forget merge cicd branch in dev.`))
    }
}
