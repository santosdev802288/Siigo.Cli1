import {fail, group} from 'k6';
import {setSleep} from '../lib/sleep.helpers'
import {SessionManagement} from "../actions/roles/public-user.role";
import {buildConfig} from "../lib/config";

// @ts-ignore
import promp from 'k6/x/siigo/promp';
import {Options} from "k6/options";
import {ENV} from "../models/enums/envs";
import {Test} from "../models/enums/test";
import {DEFAULT_PASSWORD} from "../models/constants";

/**
 * instance all extensions
 */
const prompClient = promp.Client()

/**
 * build a config instance with promp parameter
 */
const labelEnv: string = "Environment"
const env = __ENV.ENV ? __ENV.ENV : prompClient
    .prompt
    .select(
        labelEnv,
        ...Object.values(ENV)
    )

const config = buildConfig(env)

/**
 * Initialize actions by role (user, admin, owner)
 */
const sessionManagement = new SessionManagement(config)

/**
 * Webpack will automatically convert JSON to a JS object (don't need JSON.parse)
 *
 * */
const usersData = require('../data/users.generated.json')

/**
 *
 */
// Test Options https://docs.k6.io/docs/options
const labelTypeTest = "Tipo de test"
const typeOfTest = __ENV.TYPE ? __ENV.TYPE : prompClient
    .prompt
    .select(
        labelTypeTest,              // labels
        ...Object.values(Test)      // options
    )

export const options: Options = require(`./options.test.json`)[typeOfTest]


// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {


}

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default () => {

    // this is a group https://docs.k6.io/docs/tags-and-groups
    // remove this example group and implement your groups
    group("Example User login group", () => {

        // Pick a random username
        const {username} = usersData[Math.floor(Math.random() * usersData.length)];

        // user authentication
        const response = sessionManagement.login(username, DEFAULT_PASSWORD)

        // Immediately throw an error, aborting the current script iteration.
        if (response.status != 200)
            return fail(`login request failed. User: ${username} Status: ${response.status}. Response: ${response.body}`);

        // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
        setSleep();

        // user validation token
        sessionManagement.validateToken(response)

        // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
        setSleep();
    })

    console.debug(`VU: ${__VU}  -  ITER: ${__ITER}`);
}

export function teardown(data: any) {
    // 4. teardown code
}
