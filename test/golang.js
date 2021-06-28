const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs')
const path = require('path')
const os = require('os')

const GENERATOR_FOLDER = '../generators/bolt'
const GENERATOR = require(GENERATOR_FOLDER)
const NAMESPACE = 'siigo:bolt'

describe(NAMESPACE, () => {

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Bolt'))

        return helpers.run(GENERATOR, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
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

        return helpers.run(GENERATOR, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
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
});
