const crypto = require('crypto')
const fs = require('fs')
const rename = require('gulp-rename')
const verifyNewVersion = require("../../utils/notification");
const os = require('os')
const path = require('path')
const Generator = require('yeoman-generator/lib')
const {siigosay} = require('@nodesiigo/siigosay')
const {tknSiigo,wizardsiigofile} = require('../../utils/siigoFile');
const capitalize = require('../../utils/capitalize')

function findFiles (directory) {
    let fileList = []
    const files = fs.readdirSync(directory)

    files.forEach(file => {
        const fromPath = path.join(directory, file)

        const stat = fs.statSync(fromPath)
        if (stat.isFile()) {
            fileList.push(fromPath)
        } else if (stat.isDirectory()) {
            fileList = fileList.concat(findFiles(fromPath))
        }
    })
    return fileList
}

function getChecksums (directory) {
    const checksums = []
    const fileList = findFiles(directory)

    fileList.forEach(filepath => {
        const hash = crypto.createHash('sha256')
        const input = fs.readFileSync(filepath)

        hash.update(input)
        checksums.push(hash.digest('hex'))
    })

    let content = ''
    fileList.forEach((value, index) => {
        content += `${checksums[index]}  ${path.relative(directory, value)}${os.EOL}`
    })

    return content
}


module.exports = class extends Generator {
    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)
        this.log(siigosay(`Siigo Generator .Net Core.`))

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

        const message = "For more information execute yo siigo:core --help"

        if (this.options['name'] === 'true' || !this.options['name'] )
            throw new Error("--name is required or it should not be empty.\n " + message)

    }

    async prompting() {
        let tknf = tknSiigo;
        let updatetoken = this.options['token']
        if(tknSiigo =="pending" || updatetoken != undefined ) tknf = await wizardsiigofile(updatetoken);
        this.appConfig = {}
        this.appConfig.name = this.options['name']
        this.appConfig.token = tknf;
        this.appConfig.nameCapitalize = capitalize(this.appConfig.name)
        this.appConfig.projectPrefix = this.options['project-prefix']
    }

    async writing() {

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

        const checksums = getChecksums(this.destinationPath())

        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums)
    }

    end() {
        this.log(siigosay(`Project Created!!`));
    }

};
