import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import sinon from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import DotnetMSGenerator from '../../src/generators/dotnet'

const GENERATOR_FOLDER = '../../src/generators/dotnet'
const NAMESPACE = 'siigo:dotnet'

describe(NAMESPACE, () => {

  before( () => {
    sinon.stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
  }) 

  it('Generates a basic project', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Dotnet'))
    const name = path.basename(dir).split('.').reverse()[0]

    return helpers.run(DotnetMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
      .inDir(dir)
      .withOptions({ 'token': 'myToken' })
      .withPrompts({ ready: true, type: 'basic' })
      .then(() => {
        // assert something about the generator
        assert.file([
          'nuget.config',
          '.gitignore', 
          `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
          'checksums.sha256',
        ]);
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
