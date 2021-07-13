import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import path from 'path'
import os from 'os'

import CicdGenerator from '../src/generators/cicd'

const GENERATOR_FOLDER = '../src/generators/cicd'
const NAMESPACE = 'siigo:bolt'

describe(NAMESPACE, () => {

    it('Config a Golang project', () => {

        //const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.Bolt'))

        return helpers.run(CicdGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            //.inDir(dir)
            .withOptions({ 'project-name': 'golang', 'type': 'golang', 'namespace-k8s': 'cross' })
            .withPrompts({ ready: true })
            .then(() => {
                console.log(process.cwd())
                // assert something about the generator

                assert.file('.air.toml');
                assert.file('.gitignore');
                assert.file('.golangci.yml');

                assert.file('third_party/embed.go')
            });
    });
});
