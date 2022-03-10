import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import os from 'os'
import shelljs from 'shelljs'
import { restore, stub } from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import { runningOnAzurePipeline } from '../azureDevOps'
import { getGenerator, SiigoGenerator } from '../generator.factory'


describe('siigo:library', () => {
  const generator = getGenerator(SiigoGenerator.LIBRARY)


  before( () => {
    stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  it('Generates a dotnet lib', () => {
    const name = 'Dummy'
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `Siigo.Core.${name}`))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .inDir(dir)
      .withOptions({ language: 'Dotnet', name: name })
      .withPrompts({ ready: true})
      .then(() => {
        assert.file([
          `Siigo.Core.${name}/Siigo.Core.${name}.csproj`,
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

  after(() => {
    restore()
  })

});
