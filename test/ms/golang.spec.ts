import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { restore, stub } from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import GolangMSGenerator from '../../src/generators/golang'

const GENERATOR_FOLDER = '../../src/generators/golang'
const NAMESPACE = 'siigo:golang'

describe(NAMESPACE, () => {

  before( () => {
    stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  /*it('Generates a project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Bolt'))

    return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ 'token': 'myToken' })      // Mock options passed in
      .withPrompts({ ready: true })   // Mock the prompt answers
      .then(() => {
        // assert something about the generator
        
        assert.file('third_party/embed.go')
      });
  });

  it('Create ESiigo.Microservice. folder', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Golang'))
    const name = 'NoFolder'
    const folderPrefix = 'ESiigo.Microservice.'

    return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ 'token': 'myToken','project-name': name })
      .withPrompts({ ready: true, prefix: folderPrefix, name: name})   // Mock the prompt answers
      .then(() => {                
        assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
        // assert something about the generator
        
        assert.file('third_party/embed.go')
      });
  });

  it('Use default project name', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Golang'))
    const folderPrefix = 'Siigo.Microservice.'

    return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ })
      .withPrompts({ ready: true, prefix: folderPrefix})
      .then(() => {
        assert.textEqual(path.basename(process.cwd()), `${folderPrefix}TestMS`)
      })
  });*/

  after(() => {
    restore()
  })
});