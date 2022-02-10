import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import shelljs from 'shelljs'
import { restore, stub } from 'sinon'

import { getGenerator, SiigoGenerator } from '../generator.factory'
import { TestingPrefix } from '../../src/utils/generator/testing'
import { runningOnAzurePipeline } from '../azureDevOps'
import * as gitmanager from '../../src/utils/gitmanager'
import * as siigoFile from '../../src/utils/siigoFile'

enum YARN_AUDIT_CODE{
  INFO = 1,
  LOW = 2,
  MODERATE = 4,
  HIGH = 8,
  CRITICAL = 16
}

describe('siigo:test-ak6', () => {
  const generator = getGenerator(SiigoGenerator.TEST_AK6)

  before( () => {
    stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
    stub(gitmanager, 'getProjects').returns(Promise.resolve({
      Architecture:'55db46d7-c3a3-481c-b4a2-14c9f75e547a', 
      Siigo:'2b375626-f976-487e-9aa8-097804b773cc'
    }))
  })

  it('Generates a project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Test.Ak6'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true })
      .withPrompts({ createRepo: false, ready: true })
      .then(() => {
        assert.file([
          '.babelrc',
          '.gitignore'
        ]);
        if (!runningOnAzurePipeline()) {
          const auditCommand = shelljs.exec('yarn audit --level critical', { silent: true })
          assert.equal(true, auditCommand.code < YARN_AUDIT_CODE.CRITICAL, `The archetype has dependencies with bugs. \n${auditCommand.stderr}`)
        }
      });
  });

  it('Create ESiigo.Test. folder', () => {

    const name = 'NoFolder'
    const folderPrefix = TestingPrefix.SIIGO_TEST

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Test.Ak6'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true})
      .withPrompts({ createRepo: false, 'name': name, ready: true, prefix: folderPrefix })   // Mock the prompt answers
      .then(() => {
        assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
                
        assert.file([
          '.babelrc',
          '.gitignore']);
      });
  });

  after(() => {
    restore()
  })
});

