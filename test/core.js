const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs')
const path = require('path')
const os = require('os')

const GENERATOR_FOLDER = '../generators/core'
const GENERATOR = require(GENERATOR_FOLDER)
const NAMESPACE = 'siigo:core'

describe(NAMESPACE, () => {

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Core'))

        return helpers.run(GENERATOR, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'personal-token': 'myToken' })      // Mock options passed in
            .withPrompts({ ready: true })   // Mock the prompt answers
            .then(() => {
                // assert something about the generator
                assert.file('.gitignore');
            });
    });
});
