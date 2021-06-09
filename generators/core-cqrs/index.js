const Generator = require('yeoman-generator/lib');
const capitalize = require("../../utils/capitalize")
const rename = require('gulp-rename');
const getDirectoriesRecursive = require("../../utils/walkProjects")
const verifyNewVersion = require("../../utils/notification");
const {siigosay} = require('@nodesiigo/siigosay')

module.exports = class extends Generator {

    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)
    }

    initializing() {
        this.log(siigosay(`Siigo .Net Core CQRS.`))
    }

    prompting() {
        const paths = getDirectoriesRecursive(".")
            .filter(path => !path.includes("Test"))
            .filter(path => path.endsWith(".Api"))
        
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
        ]).then(res => {
            this.appConfig = {}
            this.appConfig.name = capitalize(paths.length ? paths[0] : null,)
            this.appConfig.type = res.type
            this.appConfig.name_cq = capitalize(res.name_cq)
        })
    }

    writing() {


        switch (this.appConfig.type) {
            case 'command':
                this.queueTransformStream([
                    rename((path) => {
                        path.basename = path.basename.replace(/(CreateProduct)/g, capitalize(this.appConfig.name_cq))
                        path.dirname = path.dirname.replace(/(CreateProduct)/g, capitalize(this.appConfig.name_cq))
                    })
                ]);

                this.fs.copyTpl(
                    this.templatePath("command/"),
                    this.destinationPath(`${capitalize(this.appConfig.name)}/Application/Commands/`),
                    {config: {name: this.appConfig.name, command_name: this.appConfig.name_cq}}
                )
                break

            case 'query':
                this.queueTransformStream([
                    rename((path) => {
                        path.basename = path.basename.replace(/(GetProductDetails)/g, capitalize(this.appConfig.name_cq))
                        path.dirname = path.dirname.replace(/(GetProductDetails)/g, capitalize(this.appConfig.name_cq))
                    })
                ]);
                this.fs.copyTpl(
                    this.templatePath("query/"),
                    this.destinationPath(`${capitalize(this.appConfig.name)}/Application/Queries/`),
                    {config: {name: this.appConfig.name, query_name: this.appConfig.name_cq}}
                )
                this.log("Replace the type <IContract> with your viewModel.")
                break;
        }

    }

    dependencies() {
    }

    install() {

    }

    end() {
    }
};
