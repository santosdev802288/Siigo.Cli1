import Generator = require('yeoman-generator')
import path from 'path'
import { req } from '../required-tools'
import _ from 'lodash'
import { IsDifferentLetters } from '../IsDifferentLetters'
import { Message } from '../Message'
import colorize from 'json-colorizer'
import { verifyNewVersion } from '../notification'


export enum MSPrefix {
    ESIIGO_MS = 'ESiigo.Microservice.',
    SIIGO_MS = 'Siigo.Microservice.',
}

const msPrefixes = Object.keys(MSPrefix).map(k => MSPrefix[k as keyof typeof MSPrefix])


export class MicroserviceGenerator extends Generator {
    /**
     * Trick Yeoman to call super methods
     * 
     * @param {extends MicroserviceGenerator} childClass 
     */
    static yeomanInheritance(childClass: any): void {
        childClass.prototype.prompting = MicroserviceGenerator.prototype.prompting
        childClass.prototype.writing = MicroserviceGenerator.prototype.writing
    }

    answers: any
    response: any
    createPrefix: boolean
    defaultName: string | undefined

    constructor(args: any, opt: any) {
        super(args, opt)
        req()
        verifyNewVersion()

        const currentPath = path.basename(process.cwd())
        this.createPrefix = !msPrefixes.some(prefix => currentPath.startsWith(prefix))
        this.defaultName = this.createPrefix ? undefined : currentPath.split('.').reverse()[0]
    }

    async _doPrompting() { throw new Error('You have to implement _doPrompting()') }

    async prompting() {

        // Create project folder using prefix
        if (this.createPrefix) {
            this.answers = await this.prompt([
                {
                    type: 'list',
                    name: 'prefix',
                    message: 'Select project prefix',
                    choices: msPrefixes,
                    default: msPrefixes.indexOf(MSPrefix.SIIGO_MS),
                },
            ]);
            this.response = await this.prompt([
                {
                    type: 'string',
                    name: 'name',
                    message: 'Typing the name for the project',
                    default: 'TestMS'
                },
            ]);

            if (IsDifferentLetters(this.response.name)) {
                this.log(colorize(new Message(true, "Invalid project name", `'${this.response.name}' ???? is not allowed ????, use only letters ????` ).toString(),
                  {
                    pretty: true,
                    colors: {
                        STRING_KEY: 'red',
                        STRING_LITERAL: 'magenta.bold',
                        NUMBER_LITERAL: '#FF0000', 
                    }
                }))
                return process.exit(1);
            } 

            const name = _.upperFirst(this.response.name);
            

            this.options['name'] = name
            this.options['project-name'] = name
            const appPath = path.join(process.cwd(), `${this.answers.prefix}${name}`)
            this.destinationRoot(appPath)
            process.chdir(appPath)
        }

        await this._doPrompting()
    }

    _doWriting() { throw new Error('You have to implement _doWriting()') }

    writing() {

        this._doWriting()
    }
}
