// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Generator'... Remove this comment to see the full error message
const Generator = require('yeoman-generator/lib');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getParamet... Remove this comment to see the full error message
const { getParameter, setParameter, setTribeAndNameByUser } = require('../../utils/siigoFile');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'colorize'.
const colorize = require('json-colorizer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'siigosay'.
const { siigosay } = require('@nodesiigo/siigosay');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'readTribes... Remove this comment to see the full error message
const { readTribesFile } = require('../../utils/readTribes');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'autocomple... Remove this comment to see the full error message
const autocomplete = require('../../utils/autocomplete');
async function getAllParameters(parameters: any) {
    let objParameters = {};
    parameters.forEach(async (element: any) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        objParameters[element] = await getParameter(element);
    });
    return objParameters;
}
module.exports = class extends Generator {
    constructor(args: any, opt: any) {
        super(args, opt);
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
    async initializing() {
        const parameters = ["token", "token64", "user", "name", "tribe"];
        const objParameters = await getAllParameters(parameters);
        if ((objParameters as any).name == "pending" || (objParameters as any).tribe == "pending") {
            let { name, tribe } = await setTribeAndNameByUser((objParameters as any).user);
            (objParameters as any).name = name;
            (objParameters as any).tribe = tribe;
            this.showInformation(objParameters);
        }
        else
            this.showInformation(objParameters);
    }
    async prompting() {
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
