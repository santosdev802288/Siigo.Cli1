import {fail, group} from 'k6';
import {setSleep} from '../lib/sleep.helpers'
import {Payroll, SessionManagement} from "../actions/roles/public-user.role";
import { EmployeeAvailable } from '../models/payroll';
import CONFIGS from '../config/configs'

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
const sessionManagement = new SessionManagement(config)
const payroll = new Payroll(config)

/**
 * Webpack will automatically convert JSON to a JS object (don't need JSON.parse)
 *
 * */
const payrollData: any[] = require('../data/payroll.json')

interface TestData {
    tokenCache: {[k: string]: any}
}


// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup(): TestData {
    const tokenCache: {[k: string]: any} = {}
    payrollData.forEach(row => {
        if (tokenCache[row.username] == null){
            // user authentication
            const response = sessionManagement.login(row.username)
            // Immediately throw an error, aborting the current script iteration.
            if (response.status != 200)
                fail(`login request failed. User: ${row.username} Status: ${response.status}`);
            tokenCache[row.username] = response.json('access_token')
        }
    })
    return {tokenCache}
}

// default function (imports the Bearer token) https://docs.k6.io/docs/test-life-cycle
export default (data: TestData) => {

    // this is a group https://docs.k6.io/docs/tags-and-groups
    group("Create Payroll", () => {

        // Pick a random username
        const {username, description, year, month} = payrollData[Math.floor(Math.random() * payrollData.length)];

        // user validation token
        const token = data.tokenCache[username]
        
        const employees = payroll.getEmployeesAvailableUsed(token, 0, year, month).json() as unknown as EmployeeAvailable[]

        // Test
        payroll.createPayroll(token, parseInt(employees[0].payrollContractID), description, year, month)
    })

    // sleeps help keep your script realistic https://docs.k6.io/docs/sleep-t-1
    setSleep();
}

export function teardown(data: TestData) {
    const periodDeleted: {[k: string]: any} = {}

    payrollData.forEach(row => {
        const {username, year, monthPeriod} = row;
        const period = `${year}${monthPeriod}`
        if (periodDeleted[period] == null){
            const token = data.tokenCache[username]
            payroll.deletePayrollByPeriod(token, year, monthPeriod)
            periodDeleted[period] = true;
        }
    })
}



export function cycle() {
    
}
