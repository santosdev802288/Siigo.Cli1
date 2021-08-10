import path from 'path'
import { Constructor, RunContextSettings } from 'yeoman-test';

import CoreMSGenerator from '../src/generators/core'
import Ak6TestingGenerator from '../src/generators/test.ak6'
import Generator from 'yeoman-generator';


export enum SiigoGenerator {
    MS_CORE,
    TEST_AK6,
}

export interface TestGenerator {
    readonly generatorOrNamespace: string | Constructor<Generator>, 
    readonly settings?: RunContextSettings
}

export function getGenerator(generator: SiigoGenerator): TestGenerator {
    switch (generator) {
        case SiigoGenerator.MS_CORE:
            return {
                generatorOrNamespace: CoreMSGenerator as Constructor<Generator>,
                settings: {
                    resolved: path.join(__dirname, '../src/generators/core', 'index.js'), 
                    namespace: 'siigo:core'
                }
            }
        case SiigoGenerator.TEST_AK6:
            return {
                generatorOrNamespace: Ak6TestingGenerator as Constructor<Generator>,
                settings: {
                    resolved: path.join(__dirname, '../src/generators/test.ak6', 'index.js'), 
                    namespace: 'siigo:test.ak6'
                }
            }
        default:
            throw new Error('Unkown generator');
            
    }
}

