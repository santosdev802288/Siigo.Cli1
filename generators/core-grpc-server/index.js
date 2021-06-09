const Generator = require('yeoman-generator/lib');
const capitalize = require('../../utils/capitalize')
const rename = require('gulp-rename');
const path = require('path');
const verifyNewVersion = require("../../utils/notification");
const {siigosay} = require('@nodesiigo/siigosay')
module.exports = class extends Generator {

    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)

        this.log(siigosay(`Siigo Generator .Net 5.0 grpc Server.`))

        const prefixRepo = "Siigo.Microservice."
        const eSiigoPrefixRepo = "ESiigo.Microservice."
        const currentPath = path.basename(process.cwd())

        if(!currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo))
            throw new Error(`The name project should starts with ${prefixRepo} or ${eSiigoPrefixRepo}`)

        const name = currentPath.split(".").reverse()[0]

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

        this.option("project-prefix", {
            required: false,
            description: "Use this option to replace the prefix Siigo in the file names",
            default:"Siigo",
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
        this.appConfig.projectPrefix = this.options['project-prefix']
    }

    writing() {

        this.queueTransformStream([
            rename((path) => {
                const prefixChart = "ms-"
                path.dirname = path.dirname.includes(prefixChart) ?
                    path.dirname.replace(/(Microservice)/g, this.appConfig.name) :
                    path.dirname.replace(/(Microservice)/g, capitalize(this.appConfig.name))
                path.basename = path.basename.replace(/(Microservice)/g, capitalize(this.appConfig.name))
                path.dirname = path.dirname.replace(/(Siigo)/g,this.appConfig.projectPrefix)
                path.basename = path.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix )
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
        this.log(siigosay(`Project Created!!`));
    }
};
