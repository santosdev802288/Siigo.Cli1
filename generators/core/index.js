const rename = require('gulp-rename')
const path = require('path')
const {siigosay} = require('@nodesiigo/siigosay')
const {tokenSiigo,wizardsiigofile} = require('../../utils/siigoFile');
const capitalize = require('../../utils/capitalize')
const getChecksums = require('../../utils/checksum')
const MicroserviceGenerator = require('../../utils/generator/microservice')


class CoreMSGenerator extends MicroserviceGenerator {

    constructor(args, opt) {
        super(args, opt)

        this.option("name", {
            required: this.createPrefix,
            description: "Project name",
            default: this.defaultName,
            type: String
        })

        this.option("token", {
            required: false,
            description: "Personal token. Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens",
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
        this.log(siigosay(`Siigo Generator .Net Core.`))

        const message = "For more information execute yo siigo:core --help"

        if (this.options['name'] === 'true' || !this.options['name'] )
            throw new Error("--name is required or it should not be empty.\n " + message)

    }

    async _doPrompting() {
        let tokenf = tokenSiigo;
        let updatetoken = this.options['token']
        if(tokenSiigo == "pending" || updatetoken != null ) tokenf = await wizardsiigofile(updatetoken);

        // Save config
        this.appConfig = {
            name: this.options['name'],
            token: tokenf.replace(" \n",""),
            nameCapitalize: capitalize(this.options.name),
            projectPrefix: this.options['project-prefix'],
        }
        
    }

    _doWriting() {

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

    install() {
        const checksums = getChecksums(this.destinationPath())
        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums)
    }

    end() {
        this.log(siigosay(`Project Created!!`));
    }

}

MicroserviceGenerator.yeomanInheritance(CoreMSGenerator)

module.exports = CoreMSGenerator
