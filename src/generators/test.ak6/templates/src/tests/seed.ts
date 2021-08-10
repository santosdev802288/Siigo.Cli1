import {setSleep} from '../lib/sleep.helpers'

// Test Options https://docs.k6.io/docs/options
export let options = {
    thresholds: {
        http_req_failed: ['rate<0.02'],   // http errors should be less than 2%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
};

// The Setup Function is run once before the Load Test https://docs.k6.io/docs/test-life-cycle
export function setup() {

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