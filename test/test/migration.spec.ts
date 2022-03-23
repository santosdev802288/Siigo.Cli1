import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import os from 'os'
import path from 'path'
import shell from 'shelljs'
import { getGenerator, SiigoGenerator } from '../generator.factory'
import { restore, stub } from 'sinon'

import MigrationGenerator from '../../src/generators/skub'
import { ExpiringAccessTokenCache } from '@azure/storage-blob/node_modules/@azure/core-http'

describe("siigo:migration", () => {

    const generator = getGenerator(SiigoGenerator.TEST_MIGRATION)

    before(() => {
        // stubs
        stub(MigrationGenerator.prototype, "install").callsFake(() => {
            return 
        })
    })

    it('Generates yaml configuration file', async () => {               
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migration'))
        await helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'domain': 'test-domain' })
            .withOptions({ 'file-path': path.join(__dirname, "mock/migration-mock.yaml")})
            .withOptions({ 'context': 'test-context' }) // No exist context.
            .withPrompts({ ready: true })
            .then(async () => {                
                assert.file('spark.yaml')
                assert.fileContent('spark.yaml', 'kind: SparkApplication')
            })
    })

    it('Generates yaml configuration schuduled file', async () => {            
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migration'))
        await helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'domain': 'test-domain' })
            .withOptions({ 'file-path': path.join(__dirname, "mock/migration-mock.yaml")})
            .withOptions({ 'context': 'test-context' }) // No exist context.
            .withOptions({ 'cron': '* * * * *' })
            .withPrompts({ ready: true })
            .then(async () => {                
                assert.file('spark.yaml')
                assert.fileContent('spark.yaml', 'kind: ScheduledSparkApplication')
            })
    })

    it('Throws a exception with invalid cron job', async () => {            
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migration'))
        await helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'domain': 'test-domain' })
            .withOptions({ 'file-path': path.join(__dirname, "mock/migration-mock.yaml")})
            .withOptions({ 'context': 'test-context' }) // No exist context.
            .withOptions({ 'cron': '7as * * * *' })
            .withPrompts({ ready: true })
            .catch(err => {                                
                assert.equal(err.message, 'Cron expression is not valid.')
            })
    })

    it('Throws a exception with invalid options', async () => {            
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'migration'))
        await helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'domain': 'test-domain' })            
            .withOptions({ 'context': 'test-context' }) // No exist context.            
            .withPrompts({ ready: true })
            .catch(err => {                                
                assert.ok(err.message.includes('is required or it should not be empty'))
            })
    })

    after(() => {
        restore()
    })


}) 