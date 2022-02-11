import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import os from 'os'

import path from 'path'
import sinon from 'sinon'

import * as gitmanager from '../../src/utils/gitmanager'
import * as siigoFile from '../../src/utils/siigoFile'


import { getGenerator, SiigoGenerator } from '../generator.factory'
import _ from 'lodash'


describe('siigo:cicd', () => {
  const generator = getGenerator(SiigoGenerator.MS_CICD)

  before( () => {
    sinon.stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
    sinon.stub(gitmanager, 'getProjects').returns(Promise.resolve({
      Architecture:'55db46d7-c3a3-481c-b4a2-14c9f75e547a', 
      Siigo:'2b375626-f976-487e-9aa8-097804b773cc'
    }))
  })

  it('Config a Golang project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Go'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true, 'project-name': 'golang', 'type': 'golang', 'namespace-k8s': 'cross' })
      .withPrompts({ ready: true })
      .then(() => {
        assert.file(['.docker/Dockerfile'])
        assert.fileContent('.docker/Dockerfile', /.*FROM siigo\.azurecr\.io\/golang-build.*/)
      })
  })


  it('Config a NodeJS project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Node'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true, 'project-name': 'NodeApp', 'type': 'node', 'namespace-k8s': 'cross'})
      .withPrompts({ ready: true })
      .then(() => {
        assert.file(['.docker/Dockerfile'])
        assert.fileContent('.docker/Dockerfile', /FROM siigo.azurecr.io\/node-build.*/)
      })
  })

  after(() => {
    sinon.restore()
  })
})
