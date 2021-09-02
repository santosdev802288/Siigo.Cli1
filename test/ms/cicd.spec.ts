import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import os from 'os'
import path from 'path'
import shell from 'shelljs'

import { getGenerator, SiigoGenerator } from '../generator.factory'


describe('siigo:cicd', () => {
  const generator = getGenerator(SiigoGenerator.MS_CICD)


  it('Config a dotnet project', async () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.CicdNetCore'))

    const name = path.basename(dir).split('.').reverse()[0]

    const coreMsGenerator = getGenerator(SiigoGenerator.MS_CORE)

    await helpers.run(coreMsGenerator.generatorOrNamespace, coreMsGenerator.settings)
      .cd(dir)
      .withOptions({ 'token': '6olnzdsrhifooe42m46w64lgxwpggf6pb3qjcjtbizmdmqeqvtiq' })
      .withPrompts({ ready: true })
      .then(async () => {
        assert.file([
          'nuget.config',
          '.gitignore',
          `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
          'checksums.sha256',
        ])
        shell.exec('git init',{silent: true})
      })

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true, 'namespace-k8s': 'prueba', 'dll': `Siigo.${name}.Api` })
      .withPrompts({ ready: true, updateTribes: false, tribe: 'ARQUITECTURA\n' })
      .then(() => {
        assert.file([
          '.docker/Dockerfile',
          `.docker/ms-${name.toLowerCase()}/values.yaml`,
        ])
        assert.fileContent('.docker/Dockerfile', /FROM siigo.azurecr.io\/dotnet-build.*/)
      })
  })


  it('Config a Golang project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Go'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true, 'project-name': 'golang', 'type': 'golang', 'namespace-k8s': 'cross' })
      .withPrompts({ ready: true })
      .then(() => {
        assert.file(['.docker/Dockerfile'])
        assert.fileContent('.docker/Dockerfile', /FROM golang.*/)
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
})
