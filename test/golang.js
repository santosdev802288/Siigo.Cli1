const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs')
const path = require('path')
const os = require('os')

const MyGenerator = require('../generators/bolt');

describe('siigo:bolt', () => {
    it('Generates a Go project', () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Bolt'))

        return helpers.run(MyGenerator, {resolved: path.join(__dirname, '../generators/bolt/index.js'), namespace: 'siigo:golang'})
            .inDir(dir)
            .withOptions({ 'personal-token': 'mytoken' })      // Mock options passed in
            .withPrompts({ ready: true })   // Mock the prompt answers
            .then(() => {
                // assert something about the generator
                assert.file('.air.toml');
                assert.file('.gitignore');
                assert.file('.golangci.yml');

                assert.file('third_party/embed.go')
            });
    });
});
