const Generator = require('yeoman-generator/lib');
const yosay = require('yosay')
const capitalize = require('../../utils/capitalize')
const rename = require('gulp-rename');
const verifyNewVersion = require("../../utils/notification");
const path = require('path');
const spawn = require('child_process').exec;

module.exports = class extends Generator {

    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)

        this.log(yosay(`Siigo Generator .Net Core.`))

        const prefixRepo = "Siigo.Microservice."
        const currentPath = path.basename(process.cwd())

        if(!currentPath.startsWith(prefixRepo))
            throw new Error(`The name project should starts with ${prefixRepo}`)

        const [ name, ..._ ] = currentPath.split(".").reverse()

        this.option("name", {
            required: false,
            description: "Project name",
            default: name,
            type: String
        })

        this.option("personal-token", {
            required: true,
            description: "Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens",
            type: String
        })
    }

    initializing() {

        const message = "For more information execute yo siigo:core --help"

        if (!this.options['personal-token'] || this.options['personal-token'] === 'true')
            throw new Error("--personal-token is required or it should not be empty.\n " + message)

        if (this.options['name'] === 'true' || !this.options['name'] )
            throw new Error("--name is required or it should not be empty.\n " + message)

    }

    prompting() {
        this.appConfig = {}
        this.appConfig.name = this.options['name']
        this.appConfig.token = this.options['personal-token']
        this.appConfig.nameCapitalize = capitalize(this.appConfig.name)
    }

    writing() {

        this.registerTransformStream([
            rename((path) => {
                const prefixChart = "ms-"

                path.dirname = path.dirname.includes(prefixChart) ?
                    path.dirname.replace(/(Microservice)/g, this.appConfig.name) :
                    path.dirname.replace(/(Microservice)/g, capitalize(this.appConfig.name))

                path.basename = path.basename.replace(/(Microservice)/g, capitalize(this.appConfig.name))

            })
        ]);

        this.fs.copyTpl(
            this.templatePath(""),
            this.destinationPath("."),
            {config: this.appConfig},
        );

        this.fs.copyTpl(
            this.templatePath(".*"),
            this.destinationPath("."),
            {config: this.appConfig}
        );

    }

    end() {
        this.log(yosay(`Project Created!!`));
    }
};
