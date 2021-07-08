// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('yeoman-assert');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'helpers'.
const helpers = require('yeoman-test');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'os'.
const os = require('os')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GENERATOR_... Remove this comment to see the full error message
const GENERATOR_FOLDER = '../generators/node'
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'GENERATOR'... Remove this comment to see the full error message
const GENERATOR = require(GENERATOR_FOLDER)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'NAMESPACE'... Remove this comment to see the full error message
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
