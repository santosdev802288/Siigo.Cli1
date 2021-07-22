import path from 'path'
import { Constructor, RunContextSettings } from "yeoman-test";

import CoreMSGenerator from '../src/generators/core'
import Generator from "yeoman-generator";


export enum SiigoGenerator {
    CoreMS,
}

export interface TestGenerator {
    readonly generatorOrNamespace: string | Constructor<Generator>, 
    readonly settings?: RunContextSettings
}

export function getGenerator(generator: SiigoGenerator): TestGenerator {
    switch (generator) {
        case SiigoGenerator.CoreMS:
            return {
                generatorOrNamespace: CoreMSGenerator as Constructor<Generator>,
                settings: {resolved: path.join(__dirname, '../src/generators/core', 'index.js'), namespace: 'siigo:core'}
            }
    }
}

