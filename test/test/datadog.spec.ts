import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import sinon from 'sinon'

import * as siigoFile from '../../src/utils/siigoFile'

import { getGenerator, SiigoGenerator } from '../generator.factory'
import shell from "shelljs";

describe('siigo:datadog',() => {
    const generator = getGenerator(SiigoGenerator.TEST_DD)

    before( () => {
        sinon.stub(siigoFile, 'wizardsiigofile').returns(Promise.resolve('mockToken'))
    })

    it('Generates a datadog-sli project', async () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'datadog-sli'))

        console.log(dir)

        await helpers.run(generator.generatorOrNamespace, generator.settings)
            .cd(dir)
            .withOptions({ 'ms-name': 'test' })
            .withOptions({'skip-install-step': true})
            .withPrompts({ ready: true })
            .then(async () => {
                shell.exec('ls -lha colombia/prod/datadog-sli',{silent: true})
                assert.file([
                    'colombia/prod/datadog-sli',
                ])
            })
    });
    after(() => {
        sinon.restore()
    })
});
