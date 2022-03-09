import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import os from 'os'
import shelljs from 'shelljs'
import sinon from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import DotnetMSGenerator from '../../src/generators/dotnet'
import { runningOnAzurePipeline } from '../azureDevOps'

const GENERATOR_FOLDER = '../../src/generators/dotnet'
const NAMESPACE = 'siigo:dotnet'

const templatesTypes = ['basic', 'command', 'query', 'command+query', 'grpc-server', 'grpc-client']

describe(NAMESPACE, () => {

  const projectType = templatesTypes[Math.floor(Math.random() * templatesTypes.length)]

  before( () => {
    sinon.stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  it(`Generates a "${projectType}" project`, () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Dotnet'))
    const name = path.basename(dir).split('.').reverse()[0]

    return helpers.run(DotnetMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ 'token': 'myToken' })
      .withPrompts({ ready: true, type: projectType })
      .then(() => {
        // assert something about the generator
        assert.file([
          'nuget.config',
          '.gitignore', 
          `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
          'checksums.sha256',
        ]);
        if (!runningOnAzurePipeline()) {
          shelljs.exec('dotnet build', { fatal: true, silent: true })

          const siigoFeed = 'https://pkgs.dev.azure.com/SiigoDevOps/Siigo/_packaging/nuget.siigo.com/nuget/v3/index.json'
          const outdated = `dotnet list package --outdated --source ${siigoFeed}` 

          const commands : { [key: string]: string[]; } = {
            'Deprecated': ['dotnet list package --deprecated', '>'],
            'Vulnerable': ['dotnet list package --vulnerable', '>'],
            'Outdated Siigo': [outdated, '> Siigo'],
          }

          Object.entries(commands).forEach(([key, [command, regEx]]) => {
            const result = shelljs.exec(command, {fatal: true, silent: true}).grep('--', regEx)
            const output = result.stdout.trim()
            assert.ok(_.isEmpty(output), `${key}: \n"${output}"`)
          })

        }
      });
  });

  it('Create Siigo.Microservice.* folder', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Dotnet'))
    const folderPrefix = 'Siigo.Microservice.'
    const name = 'NoFolder'

    return helpers.run(DotnetMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ 'token': 'myToken' })
      .withPrompts({ ready: true, prefix: folderPrefix, type: 'grpc-server', name: name  })
      .then(() => {
        assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
        // assert something about the generator
        assert.file(`Siigo.${name}.sln`);
        assert.file('.gitignore');
      });
  });

  after(() => {
    sinon.restore()
  })

});
