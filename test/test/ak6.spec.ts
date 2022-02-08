import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import shelljs from 'shelljs'

import { getGenerator, SiigoGenerator } from '../generator.factory'
import { TestingPrefix } from '../../src/utils/generator/testing'

enum YARN_AUDIT_CODE{
  INFO = 1,
  LOW = 2,
  MODERATE = 4,
  HIGH = 8,
  CRITICAL = 16
}

describe('siigo:test.ak6', () => {
  const generator = getGenerator(SiigoGenerator.TEST_AK6)

  it('Generates a project', () => {

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Test.Ak6'))

    return helpers.run(generator.generatorOrNamespace, generator.settings)
      .cd(dir)
      .withOptions({ 'skip-install-step': true })
      .withPrompts({ createRepo: false, ready: true })
      .then(() => {
        assert.file([
          '.babelrc',
          '.gitignore']);
        assert.equal(true, shelljs.exec('yarn audit --level critical', {silent: true}).code < YARN_AUDIT_CODE.CRITICAL)
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
});

