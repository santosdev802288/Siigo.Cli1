import Generator = require('yeoman-generator')
import path from 'path'
import { req } from '../required-tools'
import _ from 'lodash'

import { verifyNewVersion } from '../notification'


export enum TestingPrefix {
  ESIIGO_TEST = 'ESiigo.Test.',
  SIIGO_TEST = 'Siigo.Test.',
}


export abstract class TestingGenerator<T extends Generator.GeneratorOptions> extends Generator {
  /**
   * Trick Yeoman to call super methods
   * 
   * @param {extends MicroserviceGenerator} childClass 
   */
  static yeomanInheritance(childClass: any): void {
    childClass.prototype.prompting = TestingGenerator.prototype.prompting
    childClass.prototype.writing = TestingGenerator.prototype.writing
  }

  answers: any
  createPrefix: boolean
  defaultName: string | undefined

  constructor(args: string | string[], options: T) {
    super(args, options)
    req()
    verifyNewVersion()

    const currentPath = path.basename(process.cwd())
    this.createPrefix = !currentPath.startsWith(TestingPrefix.ESIIGO_TEST) && !currentPath.startsWith(TestingPrefix.SIIGO_TEST)
    this.defaultName = this.createPrefix ? undefined : currentPath.split('.').reverse()[0]
  }

  abstract _doPrompting(): Promise<void>

  async prompting(): Promise<void> {

    // TODO refactor to reduce code duplication
    // Create project folder using prefix
    if (this.createPrefix) {
      const prefixes = Object.keys(TestingPrefix).map(k => TestingPrefix[k as keyof typeof TestingPrefix])
      this.answers = await this.prompt([
        {
          type: 'list',
          name: 'prefix',
          message: 'Select project prefix',
          choices: prefixes,
          default: prefixes.indexOf(TestingPrefix.SIIGO_TEST),
        },
        {
          type: 'string',
          name: 'name',
          message: 'Typing the name for the test',
          default: 'MS'
        },
      ]);

      const name = this.answers.name
      this.options['name'] = name
      this.options['project-name'] = name

      const appPath = path.join(process.cwd(), `${this.answers.prefix}${name}`)
      this.destinationRoot(appPath)
      process.chdir(appPath)
    }

    await this._doPrompting()
  }

  abstract _doWriting(): Promise<void>

  async writing(): Promise<void> {

    await this._doWriting()

    // TODO refactor to reduce code duplication
    // Rename gitignore
    this.fs.move(
      this.destinationPath('_gitignore'),
      this.destinationPath('.gitignore')
    );
  }
}

