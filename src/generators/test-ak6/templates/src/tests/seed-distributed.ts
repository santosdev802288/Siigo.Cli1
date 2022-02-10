// @ts-ignore
import azure from 'k6/x/siigo/azure/persistence';

import {buildConfig} from "../lib/config";
import {ENV} from "../models/enums/envs";
// @ts-ignore
import promp from 'k6/x/siigo/promp';

// Test Options https://docs.k6.io/docs/options
export let options = {
    setupTimeout: '30m',
}

/**
 * instance all extensions
 */
const prompClient = promp.Client()

// instance config
const labelEnv: string = "Environment"
const env = __ENV.ENV ? __ENV.ENV : prompClient
    .prompt
    .select(
        labelEnv,
        ...Object.values(ENV)
    )

const config = buildConfig(env)

// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {

    const az = azure.Client()

    az.azure_storage.uploadFolders({
        "dist": "./dist",
    })

}

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default (data: any) => {

}

export function teardown() {
    // you can add functionality here to save the crocodile IDs to a JSON file for use by the performance tests.
}
