import {group} from 'k6';
import {setSleep} from '../lib/sleep.helpers'
import {GRPCExample} from "../actions/roles/grpc-user.role";
import CONFIGS from '../config/configs';

// Test Options https://docs.k6.io/docs/options
if (!__ENV.TYPE) {
    throw new Error(`test type not found. Try add -e TYPE={ load | smoke | soak } in your k6 arguments script`)
}

export let options = require(`./options.test.json`)[__ENV.TYPE]

/**
 * Initialize config instance
 */
 console.debug(`Started env: ${__ENV.ENV}`)
 if (!(`${__ENV.ENV}` in CONFIGS)) {
     throw new Error(`environment not found. Try add -e ENV={replace_name_env} in your k6 arguments script`)
 }
 const config = CONFIGS[__ENV.ENV]
 console.debug("JSON Config: ", JSON.stringify(config))

/**
 * Initialize actions by role (user, admin, owner)
 */
const gRPCExample = new GRPCExample(config)

/**
 * Webpack will automatically convert JSON to a JS object (don't need JSON.parse)
 *
 * */
const payrollData: any[] = require('../data/payroll.json')

interface TestData {
    tokenCache: {[k: string]: any}
}


// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {
}

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default () => {
    // this is a group https://docs.k6.io/docs/tags-and-groups
    group("Call gRPC", () => {

        // Test
        gRPCExample.exampleGetId(Math.floor(Math.random() * 42));
    })

    // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
    setSleep();
}

export function teardown(data: TestData) {
}

