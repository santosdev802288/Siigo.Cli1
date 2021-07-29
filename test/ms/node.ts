import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import fs from 'fs'
import path from 'path'
import os from 'os'

import GENERATOR from '../../src/generators/node'

const GENERATOR_FOLDER = '../../src/generators/node'
const NAMESPACE = 'siigo:node'


describe(NAMESPACE, () => {

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Node'))

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
