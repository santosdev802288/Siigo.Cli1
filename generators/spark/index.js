const Generator = require('yeoman-generator/lib');
const {siigosay, siigoerror} = require('@nodesiigo/siigosay')
const capitalize = require('../../utils/capitalize')
const verifyNewVersion = require("../../utils/notification");
const rename = require('gulp-rename');
module.exports = class extends Generator {
    constructor(args, opt) {
        verifyNewVersion()
        super(args, opt)
        this.log(siigosay(`Siigo generator Spark module.`))
    }
    writing() {
        
        let tempName = this.destinationRoot().split("/").pop().split(".")
        if(tempName[2] === undefined){
            this.log(siigoerror(`
                the project folder must have the structure "Siigo.Microservice.XXX"
            `))
        }else{
            let pname = tempName[0]+"."+tempName[2]+".Sync";
            let name = tempName[2];
    
            this.registerTransformStream([
                rename((path) => {
                    path.basename = path.basename.replace(/(MsTemplate)/g, name)
                }),
            ]);
    
            this.fs.copyTpl(
                this.templatePath(""),
                this.destinationPath(`./${pname}/`),
                {config: {name, nameUpper: capitalize(name)}}
            ) 
        }
    }

    install() {
    }

    /*
        if (this.options['skip-install']) {
            this.log(chalk.green(`
        To install dependencies, run
        ${chalk.white('$')} cd ${this.appConfig.identifier}/
        ${chalk.white('$')} npm install
      `))
        } else {
            if (this.options['yarn']) {
                this.installDependencies({
                    yarn: true,
                    bower: false,
                    npm: false,
                })
            } else {
                this.installDependencies({
                    npm: true,
                    yarn: false,
                    bower: false,
                })

            }
        }
    }*/
};
