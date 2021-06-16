const Generator = require('yeoman-generator/lib');
const {getParameter,setParameter} = require('../../utils/siigoFile');
const colorize = require('json-colorizer');
const {siigosay} = require('@nodesiigo/siigosay');
const {readTribesFile} = require('../../utils/readTribes')
const autocomplete = require('../../utils/autocomplete')

module.exports = class extends Generator {

    constructor(args, opt) {
        super(args, opt)
    }

    async initializing() {
        const tokenSiigo = await getParameter("token")
        const token64 = await getParameter("token64")
        const user = await getParameter("user")
        const name = await getParameter("name")
        const tribe = await getParameter("tribe")
        const json = {
            token: tokenSiigo,
            token64: token64,
            user: user,
            name: name,
            tribe: tribe,
        }
        
        this.log(colorize(json, {
            pretty: true,
            colors: {
                STRING_KEY: 'green',
                STRING_LITERAL: 'magenta.bold',
                NUMBER_LITERAL: '#FF0000'
            }
        }))
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
                    choices: ['token',"tribe"]
                }
            ]);
            switch(response.type){
                case "token":
                {
                    let res  = await this.prompt([
                        {
                            type: 'string',
                            name: 'token',
                            message: 'Typing your personal token: ',
                        }
                    ]);
                    setParameter("token",res.token)
                    break
                }
                case "tribe":{
                    const tribePath = './tribes/'
                    this.tribes = await readTribesFile(tribePath.concat('tribes.json'))
                    const select_tribe = await autocomplete(this.tribes)
                    setParameter("tribe",select_tribe.tribe)
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