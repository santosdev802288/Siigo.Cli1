import Generator = require('yeoman-generator');
import { getParameter, setParameter, setTribeAndNameByUser, wizardsiigofile } from '../../utils/siigoFile'
import colorize from 'json-colorizer'
import { siigosay } from '@nodesiigo/siigosay'
import { readTribesFile } from '../../utils/readTribes'
import { autocomplete } from '../../utils/autocomplete'

interface ObjectParameters {
    token?: string;
    name?: string;
    tribe?: string;
    user?: string;
}

async function getAllParameters(parameters: any): Promise<ObjectParameters> {
    let objParameters: ObjectParameters = {};
    parameters.forEach(async (element: any) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        objParameters[element] = await getParameter(element);
    });
    return objParameters;
}

module.exports = class extends Generator {
    validationToken: any;
    answers: any;
    tribes: any;

    constructor(args: any, opt: any) {
        super(args, opt);
        this.option("token", {
            description: "Generate your token https://dev.azure.com/SiigoDevOps/_usersSettings/tokens",
            type: String
        });
    }
    showInformation(json: any) {
        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }));
    }

    async getInformation(){
        const parameters = ["token","token64","user","name","tribe"] 
        const objParameters = await getAllParameters(parameters)
        if(objParameters.token !="pending"){
            if (objParameters.name == "pending" || objParameters.tribe == "pending") {
                let { name, tribe } = await setTribeAndNameByUser(objParameters.user) || {}
                objParameters.name = name
                objParameters.tribe = tribe
                this.showInformation(objParameters)
            } else this.showInformation(objParameters)
        }
        return objParameters
    }
    async initializing() {
        let {token} = this.options
        if(token!= null) {
            token = await wizardsiigofile(token) 
            this.getInformation()
        }else{
            const objParameters  = await this.getInformation()
            this.options['token'] = objParameters.token;
        }
    }
    async prompting() {
        if(this.options['token']=="pending"){
            this.validationToken  = await this.prompt([
                {
                    type: 'string',
                    name: 'token',
                    message: 'Typing your personal token: ',
                }
            ]);
            wizardsiigofile(this.validationToken.token)
            await this.getInformation(); 
        }
        this.answers = await this.prompt([
            {
                type: "confirm",
                name: "ready",
                message: "Is the configuration correct?"
            }
        ]);
        if (!this.answers.ready) {
            let response = await this.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: 'What do you want to update?',
                    choices: ['token', "tribe", "name",]
                }
            ]);
            switch (response.type) {
                case "token": {
                    let res = await this.prompt([
                        {
                            type: 'string',
                            name: response.type,
                            message: 'Typing your personal token: ',
                        }
                    ]);
                    setParameter(response.type, res.token);
                    break;
                }
                case "tribe": {
                    this.tribes = await readTribesFile();
                    const select_tribe = await autocomplete(this.tribes);
                    setParameter(response.type, select_tribe.tribe);
                    break;
                }
                case "name": {
                    let res = await this.prompt([
                        {
                            type: 'string',
                            name: response.type,
                            message: 'Typing your name: ',
                        }
                    ]);
                    setParameter(response.type, res.name);
                    break;
                }
            }
        }
    }
    writing() {
    }
    dependencies() {
    }
    install() {
    }
    end() {
        this.log(siigosay(`your siigofile has been updated`));
    }
};
