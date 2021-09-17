import Generator = require('yeoman-generator');
import {siigosay, siigoerror} from '@nodesiigo/siigosay'
import rename from 'gulp-rename'
import _ from 'lodash'


module.exports = class extends Generator {
    constructor(args: any, opt: any) {
        super(args, opt)
        this.log(siigosay(`Siigo generator Spark module.`))
    }
    writing() {
        
        const tempName = this.destinationRoot().split("/").pop()?.split(".")
        if(tempName?.[2] === undefined){
            this.log(siigoerror(`
                the project folder must have the structure "Siigo.Microservice.XXX"
            `))
        }else{
            const pname = tempName[0]+"."+tempName[2]+".Sync";
            const name = tempName[2];

            // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
            this.queueTransformStream([
                rename((path: any) => {
                    path.basename = path.basename.replace(/(MsTemplate)/g, name)
                }),
            ]);
    
            this.fs.copyTpl(
                this.templatePath(""),
                this.destinationPath(`./${pname}/`),
                {config: {name, nameUpper: _.upperFirst(name)}}
            ) 
        }
    }
};
