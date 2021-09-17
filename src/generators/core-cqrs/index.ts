import Generator = require('yeoman-generator');
import rename from 'gulp-rename';
import _ from 'lodash'

import getDirectoriesRecursive from "../../utils/walkProjects"
import {verifyNewVersion} from "../../utils/notification";
import {siigosay} from '@nodesiigo/siigosay'

module.exports = class extends Generator {
    appConfig: any;

    constructor(args: any, opt: any) {
        verifyNewVersion()
        super(args, opt)
    }

    initializing() {
        this.log(siigosay(`Siigo .Net Core CQRS.`))
    }

    prompting() {
        const paths = getDirectoriesRecursive(".")
            .filter((path: any) => !path.includes("Test"))
            .filter((path: any) => path.endsWith(".Api"))
        
        return this.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'what do you want to generate?',
                choices: ['query', 'command']
            },
            {
                type: 'input',
                name: 'name_cq',
                message: 'name:',
            }
        ]).then((res: any) => {
            this.appConfig = {}
            this.appConfig.name = _.upperFirst(paths.length ? paths[0] : '',)
            this.appConfig.type = res.type
            this.appConfig.name_cq = _.upperFirst(res.name_cq)
        });
    }

    writing() {


        switch (this.appConfig.type) {
            case 'command':
                // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
                this.queueTransformStream([
                    rename((path: any) => {
                        path.basename = path.basename.replace(/(CreateProduct)/g, _.upperFirst(this.appConfig.name_cq))
                        path.dirname = path.dirname.replace(/(CreateProduct)/g, _.upperFirst(this.appConfig.name_cq))
                    })
                ]);

                this.fs.copyTpl(
                    this.templatePath("command/"),
                    this.destinationPath(`${_.upperFirst(this.appConfig.name)}/Application/Commands/`),
                    {config: {name: this.appConfig.name, command_name: this.appConfig.name_cq}}
                )
                break

            case 'query':
                // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
                this.queueTransformStream([
                    rename((path: any) => {
                        path.basename = path.basename.replace(/(GetProductDetails)/g, _.upperFirst(this.appConfig.name_cq))
                        path.dirname = path.dirname.replace(/(GetProductDetails)/g, _.upperFirst(this.appConfig.name_cq))
                    })
                ]);
                this.fs.copyTpl(
                    this.templatePath("query/"),
                    this.destinationPath(`${_.upperFirst(this.appConfig.name)}/Application/Queries/`),
                    {config: {name: this.appConfig.name, query_name: this.appConfig.name_cq}}
                )
                this.log("Replace the type <IContract> with your viewModel.")
                break;
        }

    }
};
