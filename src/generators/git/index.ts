import Generator = require('yeoman-generator')
import { getParameter, wizardsiigofile } from '../../utils/siigoFile'
import colors from 'colors'
import colorize from 'json-colorizer'
import { siigosay } from '@nodesiigo/siigosay'
import { getProjects, createRepository } from '../../utils/gitmanager'
import path from 'path'
import shell from 'shelljs'
import { saveStatistic } from '../../utils/statistics/statistic'

const prefixRepo = 'Siigo.Microservice.';
const eSiigoPrefixRepo = 'ESiigo.Microservice.';
const siigoPrefixRepoTest = 'Siigo.Test.';

module.exports = class extends Generator {
    answers: any;

    constructor(args: any, options: any) {
        super(args, options)

        saveStatistic('git')

        this.option('project', {
            type: String,
            description: 'Project in azure devops.',
            default: 'Siigo',
            alias: 'p'
        })
    }
    showInformation(json: any) {
        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }));
    }
    async prompting() {
        let currentPath = path.basename(process.cwd())
        const createPrefix = !currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo) && !currentPath.startsWith(siigoPrefixRepoTest);
        if (createPrefix) {
            this.log(('This folder is not Siigo' as any).red);
            this.cancelCancellableTasks()
        }
        else {
            let token = await getParameter('token');
            token = (token == 'pending') ? await wizardsiigofile() : token

            let devProject = ''
            const projects = await getProjects(token)
            
            if(!this.options.project){
                const nameProjects = Object.keys(projects)
                const response = await this.prompt([
                    {
                        type: 'list',
                        name: 'project',
                        message: 'In which Project?',
                        choices: nameProjects,
                        default: 'Siigo', 
                    }
                ])
                devProject = response.project
            }else{
                devProject = this.options.project
            }

            
            this.showInformation({ project: devProject, name_repository: currentPath });
            this.answers = await this.prompt([
                {
                    type: 'confirm',
                    name: 'ready',
                    message: 'Is the configuration correct?'
                }
            ]);
            if (this.answers.ready) {
                let responseGit: any = {}
                while(!responseGit.remoteUrl){
                    responseGit = await createRepository(token, currentPath, projects[devProject])                
                    if(responseGit.remoteUrl){
                        this.log(siigosay('Your repository has been created'))
                        this.showInformation({ remoteUrl: responseGit.remoteUrl })
                        shell.exec('git init');
                        shell.exec(`git remote add origin ${responseGit.remoteUrl}`)
                    }else{
                        this.log(colors.red('Error: ya exite un repositorio con ese nombre!'))
                        const responseAzure = await this.prompt([
                            {
                                type: 'string',
                                name: 'projectname',
                                message: 'Ingresa el nombre del proyecto:',
                            }
                        ]);
                        currentPath = responseAzure.projectname;
                    }
                }
            
            }
            else
                this.cancelCancellableTasks();
        }
    }
};
