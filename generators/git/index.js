const Generator = require('yeoman-generator/lib');
const {getParameter} = require('../../utils/siigoFile');
const colorize = require('json-colorizer');
const {siigosay} = require('@nodesiigo/siigosay');
const {getProjects,createRepository} = require('../../utils/gitmanager')
const path = require('path')

const prefixRepo = "Siigo.Microservice."
const eSiigoPrefixRepo = "ESiigo.Microservice."

module.exports = class extends Generator {

    constructor(args, opt) {
        super(args, opt)
    }

    showInformation(json){
        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }))
    }
    async prompting() {
        const currentPath = path.basename(process.cwd())
        const createPrefix = !currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo)
        if(createPrefix){
            console.log("This folder is not Siigo".red);
            this.cancelCancellableTasks() 
        }else{
            const token = await getParameter("token")
            const projects = await getProjects(token)
            const nameProjects = Object.keys(projects)
            let response  = await this.prompt([
                {
                    type: 'list',
                    name: 'project',
                    message: 'Where do you want to create the repository?',
                    choices: nameProjects
                }
            ]);
            this.showInformation({project: response.project, name_repository: currentPath})
            this.answers = await this.prompt([
                {
                    type: "confirm",
                    name: "ready",
                    message: "Is the configuration correct?"
                }
            ]);
            if (this.answers.ready){
                const remoteUrl = await createRepository(token, currentPath, projects[response.project])
                this.log(siigosay(`Your repository has been created`));
                this.showInformation({remoteUrl: remoteUrl})
            }else this.cancelCancellableTasks()
        }
    }
};