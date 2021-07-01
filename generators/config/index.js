const Generator = require('yeoman-generator/lib');
const {getParameter,setParameter,setTribeAndNameByUser} = require('../../utils/siigoFile');
const colorize = require('json-colorizer');
const {siigosay} = require('@nodesiigo/siigosay');
const {readTribesFile} = require('../../utils/readTribes')
const autocomplete = require('../../utils/autocomplete')

async function getAllParameters(parameters){
    let objParameters ={}
    parameters.forEach(async element => {
        objParameters[element] = await getParameter(element)
    })
    return objParameters
}

module.exports = class extends Generator {

    constructor(args, opt) {
        super(args, opt)
    }

    showInformation(json){
        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }))
    }
 
    async initializing() {
        const parameters = ["token","token64","user","name","tribe"] 
        const objParameters = await getAllParameters(parameters)
        if (objParameters.name == "pending" || objParameters.tribe == "pending") {
            let { name, tribe } = await setTribeAndNameByUser(objParameters.user)
            objParameters.name = name
            objParameters.tribe = tribe
            this.showInformation(objParameters)
        } else this.showInformation(objParameters)
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "confirm",
                name: "ready",
                message: "Is the configuration correct?"
            }
        ]);

        if (!this.answers.ready){
            let response  = await this.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: 'What do you want to update?',
                    choices: ['token',"tribe","name",]
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
                    setParameter(response.type, res.token)
                    break
                }
                case "tribe": {
                    this.tribes = await readTribesFile()
                    const select_tribe = await autocomplete(this.tribes)
                    setParameter(response.type, select_tribe.tribe)
                    break
                }
                case "name": {
                    let res = await this.prompt([
                        {
                            type: 'string',
                            name: response.type,
                            message: 'Typing your name: ',
                        }
                    ]);
                    setParameter(response.type, res.name)
                    break
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