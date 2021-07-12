// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Generator'... Remove this comment to see the full error message
const Generator = require('yeoman-generator/lib');
//// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getParamet... Remove this comment to see the full error message
const { getParameter, wizardsiigofile } = require('../../utils/siigoFile');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'colorize'.
const colorize = require('json-colorizer');
//// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'colors'.
const colors = require('colors/safe');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'siigosay'.
const { siigosay } = require('@nodesiigo/siigosay');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getProject... Remove this comment to see the full error message
const { getProjects, createRepository } = require('../../utils/gitmanager');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'shell'.
const shell = require("shelljs");
//// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'prefixRepo... Remove this comment to see the full error message
const prefixRepo = "Siigo.Microservice.";
//// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'eSiigoPref... Remove this comment to see the full error message
const eSiigoPrefixRepo = "ESiigo.Microservice.";
module.exports = class extends Generator {
    constructor(args: any, opt: any) {
        super(args, opt);
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
        let currentPath = path.basename(process.cwd());
        const createPrefix = !currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo);
        if (createPrefix) {
            console.log(("This folder is not Siigo" as any).red);
            this.cancelCancellableTasks();
        }
        else {
            let token = await getParameter("token");
            token = (token == "pending") ? await wizardsiigofile() : token;
            const projects = await getProjects(token);
            const nameProjects = Object.keys(projects);
            let response = await this.prompt([
                {
                    type: 'list',
                    name: 'project',
                    message: 'Where do you want to create the repository?',
                    choices: nameProjects
                }
            ]);
            this.showInformation({ project: response.project, name_repository: currentPath });
            this.answers = await this.prompt([
                {
                    type: "confirm",
                    name: "ready",
                    message: "Is the configuration correct?"
                }
            ]);
            if (this.answers.ready) {
                let responseGit: any = {}
                while(!responseGit.remoteUrl){
                    responseGit = await createRepository(token, currentPath, projects[response.project]);
                    if(responseGit.remoteUrl){
                        this.log(siigosay(`Your repository has been created`));
                        this.showInformation({ remoteUrl: responseGit.remoteUrl });
                        shell.exec(`git init`);
                        shell.exec(`git remote add origin ${responseGit.remoteUrl}`);
                    }else{
                        console.log(colors.red("Error: ya exite un repositorio con ese nombre!"))
                        let responseAzure = await this.prompt([
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
