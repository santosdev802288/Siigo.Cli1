import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'

import CoreMSGenerator from '../src/generators/core'

const BACKUP_SUFIX = '.original'
const GENERATOR_FOLDER = '../src/generators/core'
const NAMESPACE = 'siigo:core'
const GITCONFIG_FILE = path.join(os.homedir(), '.gitconfig')
const SIIGO_FILE = path.join(os.homedir(), '.siigo')

describe(NAMESPACE, () => {

    before( () => {
        // Backup user config
        [GITCONFIG_FILE, SIIGO_FILE].forEach(file => {
            if(fs.existsSync(file)){
                fs.renameSync(file, file + BACKUP_SUFIX)
            }   
        })
        
    }) 

    it('Generates a project', () => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Core'))
        const name = path.basename(dir).split('.').reverse()[0]

        return helpers.run(CoreMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .inDir(dir)
            .withOptions({ 'token': 'myToken' })      // Mock options passed in
            .withPrompts({ ready: true })   // Mock the prompt answers
            .then(() => {
                // assert something about the generator
                assert.file([
                    'nuget.config', 
                    '.gitignore', 
                    `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
                    'checksums.sha256',
                ]);

                // Check checksums
                //assert.strictEqual(shell.exec('sha256sum --quiet -c checksums.sha256').code, 0)
            });
    });

    it('Create Siigo.Microservice.* folder', () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Core'))
        const folderPrefix = 'Siigo.Microservice.'
        const name = 'NoFolder'

        return helpers.run(CoreMSGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
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
            if(fs.existsSync(file + BACKUP_SUFIX)){
                fs.renameSync(file + BACKUP_SUFIX, file)
            }
        })
    })

});
