const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs')
const path = require('path')
const os = require('os')
const shell = require('shelljs');
const { after } = require('mocha');

const BACKUP_SUFIX = '.original'
const GENERATOR_FOLDER = '../generators/core'
const GENERATOR = require(GENERATOR_FOLDER)
const NAMESPACE = 'siigo:core'
const GITCONFIG_FILE = path.join(os.homedir(), '.gitconfig')
const SIIGO_FILE = path.join(os.homedir(), '.siigo')

describe(NAMESPACE, () => {

    before( () => {
        // Backup user config
        [GITCONFIG_FILE, SIIGO_FILE].forEach(file => {
            fs.renameSync(file, file + BACKUP_SUFIX)
        })
        
    }) 

    it('Generates a project', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Core'))

        return helpers.run(GENERATOR, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'token': 'myToken' })      // Mock options passed in
            .withPrompts({ ready: true })   // Mock the prompt answers
            .then(() => {
                // assert something about the generator
                assert.file(['nuget.config', '.gitignore']);

                // Check checksums
                assert.strictEqual(shell.exec('sha256sum --quiet -c checksums.sha256').code, 0)
            });
    });

    it('Create Siigo.Microservice.* folder', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Core'))
        const folderPrefix = 'Siigo.Microservice.'
        const name = 'NoFolder'

        return helpers.run(GENERATOR, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'token': 'myToken', 'name': name })// Mock options passed in
            .withPrompts({ ready: true, prefix: folderPrefix  })   // Mock the prompt answers
            .then(() => {
                assert.ok(process.cwd().endsWith(`${folderPrefix}${name}`))
                // assert something about the generator
                assert.file(`Siigo.${name}.sln`);
                assert.file(`.gitignore`);
            });
    });

    after(() => {
        // Restore user config
        [GITCONFIG_FILE, SIIGO_FILE].forEach(file => {
            fs.renameSync(file + BACKUP_SUFIX, file)
        })
    })

});
