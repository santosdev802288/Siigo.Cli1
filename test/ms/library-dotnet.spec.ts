import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { restore, stub } from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import { runningOnAzurePipeline } from '../azureDevOps'
import { getGenerator, SiigoGenerator } from '../generator.factory'
import { assertNoOutdatedPackages, dotnetBuild } from '../helper/dotnetUtils'


describe('siigo:library', () => {
  const generator = getGenerator(SiigoGenerator.LIBRARY)


  before( () => {
    stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  it('Generates a dotnet library', () => {
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
          dotnetBuild()
          assertNoOutdatedPackages()
        }
      });
  });

  after(() => {
    restore()
  })

});
