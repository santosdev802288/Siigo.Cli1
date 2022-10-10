import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import sinon from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import { getGenerator, SiigoGenerator } from '../generator.factory'


describe('siigo:node', () => {
  const generator = getGenerator(SiigoGenerator.MS_NODE)

  before( () => {
    sinon.stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  it('Generates a Node project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Node'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .inDir(dir)
      .withOptions({ 'personal-token': 'myToken' })      // Mock options passed in
      .withPrompts({ ready: true })   // Mock the prompt answers
      .then(() => {
        assert.file([
          '.dockerignore',
          /*'.gitignore',*/
          '.husky/pre-commit',
          '.npmrc'
        ])

        // Run project
        //assert.strictEqual(shell.exec('npm ci', {silent: true}).code, 0)
        //assert.strictEqual(shell.exec('npm run lint', {silent: true}).code, 0)
      })
  })

  after(() => {
    sinon.restore()
  })

})
