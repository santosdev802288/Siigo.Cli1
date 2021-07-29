import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'

import { getGenerator, SiigoGenerator } from '../generator.factory'

describe('siigo:test.ak6', () => {
    const generator = getGenerator(SiigoGenerator.TEST_AK6)

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Test.Ak6'))

        return helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ })
            .withPrompts({ ready: true })
            .then(() => {
                assert.file([
                    '.babelrc',
                    '.gitignore']);
            });
    });

    it('Create ESiigo.Test. folder', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Test.Ak6'))
        const name = 'NoFolder'
        const folderPrefix = 'Siigo.Test.'

        return helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'name':  name})
            .withPrompts({ ready: true, prefix: folderPrefix })   // Mock the prompt answers
            .then(() => {
                assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
                
                assert.file([
                    '.babelrc',
                    '.gitignore']);
            });
    });

    it('Fail whith missing project name, prefix and token', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Test.Ak6'))

        return helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ })
            .withPrompts({ ready: true })
            .then(() => {
                assert.fail()
            })
            .catch(error => {
                assert.textEqual(error.message, 'name is required.\nFor help execute "yo siigo:test.ak6 --help".')
            });
    });
});
