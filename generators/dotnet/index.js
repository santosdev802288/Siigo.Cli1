const crypto = require('crypto')
const fs = require('fs')
const rename = require('gulp-rename');
const verifyNewVersion = require("../../utils/notification");
const os = require('os')
const path = require('path')
const Generator = require('yeoman-generator/lib');
const capitalize = require("../../utils/capitalize")
const {siigosay} = require('@nodesiigo/siigosay')
const {getParameter,wizardsiigofile} = require('../../utils/siigoFile');
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

async function getAllParametersSiigo(parameters){
    let objParameters ={}
    parameters.forEach(async element => {
        objParameters[element] = await getParameter(element)
    })
    return objParameters
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

        this.option("project-prefix", {
            required: false,
            description: "Use this option to replace the prefix Siigo in the file names",
            default:"Siigo",
            type: String
        })

    }


    async initializing() {

    }

    async prompting() {
        const parameters = ["token","token64","user","name","tribe"] 
        const objParameters = await getAllParametersSiigo(parameters)
        let response  = await this.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'what do you want to generate?',
                choices: ['basic', 'command','query','command+query']
            }
        ]);
        let tokenf = objParameters.token;
        let updatetoken = this.options['token']
        if(tokenf =="pending" || updatetoken != null ) tokenf = await wizardsiigofile(updatetoken);
        this.appConfig = {}
        this.appConfig.name = this.options['name']
        this.appConfig.nameCapitalize = capitalize(this.appConfig.name)
        this.appConfig.type = response.type
        this.appConfig.userSiigo = objParameters.user;
        this.appConfig.nameDev = objParameters.name;
        this.appConfig.token = tokenf;
        this.appConfig.projectPrefix = this.options['project-prefix']
    }

    writing() {
        let nametemplate = (this.appConfig.type == 'command+query') ? 'commandquery' : this.appConfig.type 
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
            this.templatePath(nametemplate+"/"),
            this.destinationPath("."),
            {config: this.appConfig},
        );
    
        this.fs.copyTpl(
            this.templatePath(nametemplate+"/.*"),
            this.destinationPath("."),
            {config: this.appConfig}
        );
    
        const checksums = getChecksums(this.destinationPath())
        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums)
    }

    dependencies() {
    }

    install() {

    }

    end() {
        this.log(siigosay(`Project Created!!`));
    }
};