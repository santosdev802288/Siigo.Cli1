import Generator = require('yeoman-generator');
import { getParameter, wizardsiigofile } from '../../utils/siigoFile';
import colorize from 'json-colorizer';
import { siigosay } from '@nodesiigo/siigosay';
import { getProjects, createRepository } from '../../utils/gitmanager';
import path from 'path';
import shell from "shelljs";

const prefixRepo = "Siigo.Microservice.";
const eSiigoPrefixRepo = "ESiigo.Microservice.";

module.exports = class extends Generator {
    answers: any;

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
        const currentPath = path.basename(process.cwd());
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
                // @ts-expect-error FIXME: projects indexing
                const remoteUrl = await createRepository(token, currentPath, projects[response.project]);
                this.log(siigosay(`Your repository has been created`));
                this.showInformation({ remoteUrl: remoteUrl });
                shell.exec(`git init`);
                shell.exec(`git remote add origin ${remoteUrl}`);
            }
            else
                this.cancelCancellableTasks();
        }
    }
};
