import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'

import GolangMSGenerator from '../../src/generators/bolt'

const GENERATOR_FOLDER = '../../src/generators/bolt'
const NAMESPACE = 'siigo:bolt'

describe(NAMESPACE, () => {

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Bolt'))

        return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'personal-token': 'myToken' })      // Mock options passed in
            .withPrompts({ ready: true })   // Mock the prompt answers
            .then(() => {
                // assert something about the generator
                assert.file('.air.toml');
                assert.file('.gitignore');
                assert.file('.golangci.yml');

                assert.file('third_party/embed.go')
            });
    });

    it('Create ESiigo.Microservice. folder', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Golang'))
        const name = 'NoFolder'
        const folderPrefix = 'ESiigo.Microservice.'

        return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'personal-token': 'myToken', 'project-name':  name})
            .withPrompts({ ready: true, prefix: folderPrefix })   // Mock the prompt answers
            .then(() => {
                assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
                // assert something about the generator
                assert.file('.air.toml');
                assert.file('.gitignore');
                assert.file('.golangci.yml');

                assert.file('third_party/embed.go')
            });
    });

    it('Fail whith missing project-name, prefix and token', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Golang'))
        const folderPrefix = 'Siigo.Microservice.'

        return helpers.run(GolangMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ })
            .withPrompts({ ready: true, prefix: folderPrefix })   // Mock the prompt answers
            .then(() => {
                assert.fail()
            })
            .catch(error => {
                assert.ok(error.message.startsWith('project-name is required or it should not be empty'), error.message)
                
            });
    });
});
