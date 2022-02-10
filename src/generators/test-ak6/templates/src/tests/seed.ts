// @ts-ignore
import auth from 'k6/x/siigo/jwt';
// @ts-ignore
import file from 'k6/x/siigo/file';

import {SessionManagement} from "../actions/session-management.actions";
import {setSleep} from '../lib/sleep.helpers'
import {buildConfig} from "../lib/config";
import {ENV} from "../models/enums/envs";
// @ts-ignore
import promp from 'k6/x/siigo/promp';
import {type} from "os";
import {fail} from "k6";
import {DEFAULT_PASSWORD} from "../models/constants";

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

/**
 * Initialize actions by role (user, admin, owner)
 */
const sessionManagement = new SessionManagement(config)

// import your custom data
const data = require("../data/users.json")

// prompt parameters
const labelClaims = "Do you want to save the token claims?"
const shouldIncludeClaims = __ENV.CLAIMS ? __ENV.CLAIMS : prompClient
    .prompt
    .select(
        labelClaims,               // label
        false,
        true
    )

// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {

    // instance client extensions
    const authClient = auth.Client()
    const fs = file.Client()

    const authData: any[] = []

    data.forEach((userItem: any) => {

        try {
            // extract email
            const {username} = userItem

            // auth user
            const response = sessionManagement.login(username, DEFAULT_PASSWORD)

            // log response info
            console.info("[Login]: ", username, "[Http Status]", response.status )

            if (response.status != 200)
                return fail(`login request failed. User: ${username} Status: ${response.status}. Response: ${response.body}`);

            // extract token from response
            userItem.token = response.json("access_token")

            // decode jwt and extract claims
            // add script parameter to enable. example: -e claims=true
            if(shouldIncludeClaims == "true" || shouldIncludeClaims == "True"){
                const { header } = authClient.jwt.decode(userItem.token)
                userItem.claims = header
            }

            // save user info in memory
            authData.push(userItem)

        }catch (e){
            console.error("[Login Exception]", e)
        }
    })

    // write users with authentication info into file
    fs.file.write(authData, "./src/data/users.generated.json")

    // anything returned here can be imported into the default function https://docs.k6.io/docs/test-life-cycle
    return {};
}

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default (data: any) => {

    // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
    setSleep();
}

export function teardown() {
    // you can add functionality here to save the crocodile IDs to a JSON file for use by the performance tests.
}
