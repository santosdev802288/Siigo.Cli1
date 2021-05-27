const crypto = require('crypto')
const fs = require('fs')
const rename = require('gulp-rename')
const os = require('os')
const path = require('path')
const Generator = require('yeoman-generator/lib')
const {siigosay, siigoerror} = require('@nodesiigo/siigosay')
const {tknSiigo,wizardsiigofile} = require('../../utils/siigoFile');

const capitalize = require('../../utils/capitalize')
const verifyNewVersion = require('../../utils/notification')

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
    }

    initializing() {

        if (this.options['name'] === 'true' || !this.options['name'] )
            throw new Error("--name is required or it should not be empty.\n " + message)

    }

    async prompting() {
        let tknf = tknSiigo;
        if(tknSiigo =="pending") tknf = await wizardsiigofile();
        this.appConfig = {}
        this.appConfig.name = this.options['name']
        this.appConfig.token = tknf;
        this.appConfig.nameCapitalize = capitalize(this.appConfig.name)
    }

    async writing() {

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

        const checksums = getChecksums(this.destinationPath())

        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums)
    }

    end() {
        this.log(siigosay(`Project Created!!`));
    }

};
