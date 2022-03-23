import path from 'path'
import { Constructor, RunContextSettings } from 'yeoman-test';
import Generator from 'yeoman-generator';

import CicdGenerator from '../src/generators/cicd'
import NodeMSGenerator from '../src/generators/node'
import Ak6TestingGenerator from '../src/generators/test-ak6'
import DatadogGenerator from '../src/generators/datadog'
import MigrationGenerator from '../src/generators/skub';


export enum SiigoGenerator {
  MS_CICD,
  MS_NODE,
  TEST_AK6,
  TEST_DD,
  TEST_MIGRATION
}

export interface TestGenerator {
  readonly generatorOrNamespace: string | Constructor<Generator>,
  readonly settings?: RunContextSettings
}

export function getGenerator(generator: SiigoGenerator): TestGenerator {
  switch (generator) {
    case SiigoGenerator.MS_CICD:
      return {
        generatorOrNamespace: CicdGenerator as Constructor<Generator>,
        settings: {
          resolved: path.join(__dirname, '../src/generators/cicd', 'index.js'),
          namespace: 'siigo:cicd'
        }
      }
    case SiigoGenerator.MS_NODE:
      return {
        generatorOrNamespace: NodeMSGenerator as Constructor<Generator>,
        settings: {
          resolved: path.join(__dirname, '../src/generators/node', 'index.js'),
          namespace: 'siigo:node'
        }
      }
    case SiigoGenerator.TEST_AK6:
      return {
        generatorOrNamespace: Ak6TestingGenerator as Constructor<Generator>,
        settings: {
          resolved: path.join(__dirname, '../src/generators/test-ak6', 'index.js'),
          namespace: 'siigo:test-ak6'
        }
      }
    case SiigoGenerator.TEST_DD:
      return {
        generatorOrNamespace: DatadogGenerator as Constructor<Generator>,
        settings: {
          resolved: path.join(__dirname, '../src/generators/datadog', 'index.js'),
          namespace: 'siigo:datadog'
        }
      }

    case SiigoGenerator.TEST_MIGRATION:
      return {
        generatorOrNamespace: MigrationGenerator as Constructor<Generator>,
        settings: {
          resolved: path.join(__dirname, '../src/generators/skub', 'index.js'),
          namespace: 'siigo:skub'
        }
      }
    default:
      throw new Error('Unkown generator');

  }
}

