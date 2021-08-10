import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import fs from 'fs'
import os from 'os'
import path from 'path'
import shell from 'shelljs';

import CicdGenerator from '../../src/generators/cicd'
import { getGenerator, SiigoGenerator } from '../generator.factory'

const GENERATOR_FOLDER = '../../src/generators/cicd'
const NAMESPACE = 'siigo:cicd'

describe(NAMESPACE, () => {

    it('Config a dotnet project', async () => {

        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'Siigo.Microservice.CicdNetCore'))
        console.log(dir);
        
        const name = path.basename(dir).split('.').reverse()[0]

        const coreMsGenerator = getGenerator(SiigoGenerator.MS_CORE)
        const projectName = 'cicdchart'

        await helpers.run(coreMsGenerator.generatorOrNamespace, coreMsGenerator.settings)
            .cd(dir)
            .withOptions({ 'token': '6olnzdsrhifooe42m46w64lgxwpggf6pb3qjcjtbizmdmqeqvtiq' })
            .withPrompts({ ready: true })
            .then(async () => {
                assert.file([
                    'nuget.config', 
                    '.gitignore', 
                    `Siigo.${name}.Api/Siigo.${name}.Api.csproj`,
                    'checksums.sha256',
                ]);
                shell.exec('git init',{silent: true})
            })    
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
