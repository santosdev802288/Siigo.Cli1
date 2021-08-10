import {check, group} from "k6";
import http, {RefinedResponse} from "k6/http";
import {Counter} from "k6/metrics";
import {setSleep} from "../../lib/sleep.helpers";
import {IConfig} from "../../config/config";

export class SessionManagement {

    public counterLoginFail = new Counter('counterAuthFail');
    public counterLoginOk = new Counter('counterLoginOk');

    public counterValidationTokenErrors = new Counter('counterValidationTokenErrors');
    public counterValidationTokenOk = new Counter('counterValidationTokenOk');

    public headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Authorization": "Basic U2lpZ29XZWI6QUJBMDhCNkEtQjU2Qy00MEE1LTkwQ0YtN0MxRTU0ODkxQjYx",
    }

    public constructor(
        public readonly config: IConfig
    ) {
    }

    /**
     *
     * @param username
     */
    public login(username: string) {

        let loginResponse = {} as RefinedResponse<any>

        group("user auth", () => {

            loginResponse = http.post(
                `${this.config.serviceUrl}/connect/token?`,
                `grant_type=password&username=${username}&password=1111&scope=WebApi offline_access`,
                {
                    headers: this.headers,
                    tags: {
                        name: 'login', // first request
                    },
                }
            );

            check(loginResponse, {
                'login status is 200': () => loginResponse.status === 200,
                'has token': () => !!loginResponse.json("access_token"),
            })

            this.counterLoginOk.add(loginResponse.status === 200)
            this.counterLoginFail.add(loginResponse.status !== 200)
        })

        setSleep(0.5, 1);

        return loginResponse
    }

    /**
     *
     * @param loginData
     */
    public validateToken(loginData: any): void {

        group("validate auth token", () => {
            const validateToken = http.get(
                `${this.config.serviceUrl}/connect/accessTokenValidation?token=${loginData.json("access_token")}`,
                {
                    headers: this.headers,
                    tags: {
                        name: 'validate_login_token',
                    },
                }
            );

            check(validateToken, {
                'token validation status is 200': () => validateToken.status === 200,
            });

            this.counterValidationTokenErrors.add(validateToken.status !== 200)
            this.counterValidationTokenOk.add(validateToken.status === 200)
        })

        setSleep(0.5, 1);
    }
}
