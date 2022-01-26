import Generator = require('yeoman-generator')
import path from 'path'
import {req} from '../required-tools'
import _ from 'lodash'

import {verifyNewVersion} from '../notification'


export enum LbPrefix {
    Dotnet = 'Siigo.Core.',
    Node = 'Siigo.Core.Node.',
    Angular = 'Siigo.Core.Angular.',
}

const LbPrefixes = Object.keys(LbPrefix).map(k => LbPrefix[k as keyof typeof LbPrefix])

function getKeyName(value: string) {
    return Object.entries(LbPrefix).find(([key, val]) => key == value)?.[1];
}

export class LibraryGenerator extends Generator {
    /**
     * Trick Yeoman to call super methods
     * 
     * @param {extends LibraryGenerator} childClass 
     */
    static yeomanInheritance(childClass: any): void {
        childClass.prototype.prompting = LibraryGenerator.prototype.prompting
        childClass.prototype.writing = LibraryGenerator.prototype.writing
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
        this.createPrefix = !LbPrefixes.some(prefix => currentPath.startsWith(prefix))
        this.defaultName = this.createPrefix ? undefined : currentPath.split('.').reverse()[0]
    }

    async _doPrompting() { throw new Error('You have to implement _doPrompting()')}

    async prompting() {

        // Create project folder using prefix
        if(this.createPrefix){
            this.answers = await this.prompt([
                {
                    type: 'list',
                    name: 'language',
                    message: 'Select project prefix',
                    choices: ['Dotnet', 'Node', 'Angular'],
                    default: 'Dotnet',
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
            
            const name = _.upperFirst(this.response.name);
            this.options['name'] = name
            this.options['project-name'] = name
            this.options['language'] = this.answers.language
            const appPath = path.join(process.cwd(), `${getKeyName(this.answers.language)}${name}`)
            this.destinationRoot(appPath)
            process.chdir(appPath)
        }

        await this._doPrompting()
    }

    _doWriting() { throw new Error('You have to implement _doWriting()')}

    writing() {

        this._doWriting()

        // Rename gitignore
        this.fs.move(
            this.destinationPath('_gitignore'),
            this.destinationPath('.gitignore')
        );
    }
}
