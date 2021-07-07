import rename = require('gulp-rename');
import { verifyNewVersion } from "../../utils/notification";
import path from 'path';
import Generator = require('yeoman-generator');
import { capitalize } from "../../utils/capitalize";
import { siigosay } from '@nodesiigo/siigosay';
import { getParameter, wizardsiigofile } from '../../utils/siigoFile';
import { getChecksums } from '../../utils/checksum';


async function getAllParametersSiigo(parameters: any) {
    let objParameters = {};
    parameters.forEach(async (element: any) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        objParameters[element] = await getParameter(element);
    });
    return objParameters;
}
module.exports = class extends Generator {
    appConfig: {
        name?: any,
        nameCapitalize?: any,
        projectPrefix?: any,
        token?: any,
        type?: any,
        userSiigo?: any,
        nameDev?: any,
    } = {};
    
    constructor(args: any, opt: any) {
        super(args, opt);
        verifyNewVersion();
        this.log(siigosay(`Siigo Generator .Net Core.`));
        const prefixRepo = "Siigo.Microservice.";
        const eSiigoPrefixRepo = "ESiigo.Microservice.";
        const currentPath = path.basename(process.cwd());
        if (!currentPath.startsWith(prefixRepo) && !currentPath.startsWith(eSiigoPrefixRepo))
            throw new Error(`The name project should starts with ${prefixRepo} or ${eSiigoPrefixRepo}`);
        const name = currentPath.split(".").reverse()[0];
        this.option("name", {
            description: "Project name",
            default: name,
            type: String
        });
        this.option("project-prefix", {
            description: "Use this option to replace the prefix Siigo in the file names",
            default: "Siigo",
            type: String
        });
    }
    async initializing() {
    }
    async prompting() {
        const parameters = ["token", "token64", "user", "name", "tribe"];
        const objParameters = await getAllParametersSiigo(parameters);
        let response = await this.prompt([
            {
                type: 'list',
                name: 'type',
                message: 'what do you want to generate?',
                choices: ['basic', 'command', 'query', 'command+query', 'grpc-server', 'grpc-client']
            }
        ]);
        let tokenf = (objParameters as any).token;
        let updatetoken = this.options['token'];
        if (tokenf == "pending" || updatetoken != null)
            tokenf = await wizardsiigofile(updatetoken);
        this.appConfig = {};
        this.appConfig.name = this.options['name'];
        this.appConfig.nameCapitalize = capitalize(this.appConfig.name);
        this.appConfig.type = response.type;
        this.appConfig.userSiigo = (objParameters as any).user;
        this.appConfig.nameDev = (objParameters as any).name;
        this.appConfig.token = tokenf;
        this.appConfig.projectPrefix = this.options['project-prefix'];
    }
    writing() {
        let nametemplate = (this.appConfig.type == 'command+query') ? 'commandquery' : this.appConfig.type;
        // @ts-expect-error FIXME: Missing method on @types/yeoman-generator
        this.queueTransformStream([
            rename((path: any) => {
                const prefixChart = "ms-";
                path.dirname = path.dirname.includes(prefixChart) ?
                    path.dirname.replace(/(Microservice)/g, this.appConfig.name) :
                    path.dirname.replace(/(Microservice)/g, capitalize(this.appConfig.name));
                path.basename = path.basename.replace(/(Microservice)/g, capitalize(this.appConfig.name));
                path.dirname = path.dirname.replace(/(Siigo)/g, this.appConfig.projectPrefix);
                path.basename = path.basename.replace(/(Siigo)/g, this.appConfig.projectPrefix);
            })
        ]);
        this.fs.copyTpl(this.templatePath(nametemplate + "/"), this.destinationPath("."), { config: this.appConfig });
        this.fs.copyTpl(this.templatePath(nametemplate + "/.*"), this.destinationPath("."), { config: this.appConfig });
        const checksums = getChecksums(this.destinationPath());
        this.fs.write(path.join(this.destinationPath(), 'checksums.sha256'), checksums);
    }
    dependencies() {
    }
    install() {
    }
    end() {
        this.log(siigosay(`Project Created!!`));
    }
};
