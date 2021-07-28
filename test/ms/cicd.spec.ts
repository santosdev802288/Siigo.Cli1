import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import os from 'os'
import path from 'path'

import CicdGenerator from '../../src/generators/cicd'
import { getGenerator, SiigoGenerator } from '../generator.factory'

const GENERATOR_FOLDER = '../../src/generators/cicd'
const NAMESPACE = 'siigo:cicd'

describe(NAMESPACE, () => {

    it('Config a dotnet project', async () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.CicdNetCore'))
        const name = path.basename(dir).split('.').reverse()[0]

        const coreMsGenerator = getGenerator(SiigoGenerator.MS_CORE)
        const projectName = 'borrame'

        await helpers.run(coreMsGenerator.generatorOrNamespace, coreMsGenerator.settings)
            .cd(dir)
            .withOptions({ 'token': 'myToken' })
            .withPrompts({ ready: true })
            .then(async () => {
                assert.file([
                    'nuget.config', 
                    '.gitignore', 
                    `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
                    'checksums.sha256',
                ]);
            })
        
        return helpers.run(CicdGenerator, {resolved: path.join(__dirname, GENERATOR_FOLDER, 'index.js'), namespace: NAMESPACE})
            .cd(dir)
            .withOptions({ 'project-name': projectName, 'namespace-k8s': 'prueba', 'dll': `Siigo.${name}.Api` })
            .withPrompts({ ready: true, updateTribes: false, tribe: 'ARQUITECTURA\n' })
            .catch((error) => {
                assert.ok(error, 'Command should fail with exit code 128: git checkout -b cicd')
                assert.file([
                    `.docker/${projectName}/values.yaml`,
                ]);
            });
        

        
        
    });

    /*it('Config a Golang project', () => {

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
    });*/
});
