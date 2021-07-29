import { check, group } from "k6";
import http, { RefinedResponse } from "k6/http";
import { Counter } from "k6/metrics";

import { setSleep } from "../lib/sleep.helpers";
import { IConfig } from "../models/config";

export class Payroll {

    public countDeletePayrollOk = new Counter('countDeletePayrollOk');
    public countCreatePayrollOk = new Counter('countCreatePayrollOk');
    public countGetEmployees = new Counter('countGetEmployees');

    public static headers(token: string) {
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }

    public constructor(
        public readonly config: IConfig
    ) {
    }

    /**
     * Create a payroll 
     * 
     * @param token 
     * @param payrollContractID 
     * @param description 
     * @param year 
     * @param month 
     * @returns 
     */
    public createPayroll(token: string, payrollContractID: number, description: string, year: any, month: any) {

        let response = {} as RefinedResponse<any>

        const body = {
            "description": description,
            "year": year,
            "month": month,
            "contractCodes": [payrollContractID]
        }

        group("create payroll", () => {
            response = http.post(
                `${this.config.nominaUrl}Biz/CreatePayroll`,
                JSON.stringify(body),
                {
                    headers: Payroll.headers(token),
                    tags: { name: 'createPayroll', },
                }
            );

            if (check(response, {
                'status is 200': () => response.status === 200,
            })) {
                this.countCreatePayrollOk.add(response.status === 200)
            } else {
                console.error(`createPayroll ${response.body}`)
                this.countGetEmployees.add(response.status !== 200)
            }
        })

        setSleep(0.5, 1);

        return response
    }

    /**
     * Delete all the payrolls for a specific year and month
     * 
     * @param token 
     * @param year 
     * @param monthPeriod 
     * @returns 
     */
    deletePayrollByPeriod(token: string, year: any, monthPeriod: any) {
        let response = {} as RefinedResponse<any>

        group("delete Payroll By Period", () => {
            response = http.del(
                `${this.config.nominaUrl}/DeletePayrollByPeriod/${year}${monthPeriod}`,
                undefined,
                {
                    headers: Payroll.headers(token),
                    tags: { name: 'deletePayrollByPeriod', },
                }
            );


            if (check(response, {
                'status is 200': () => response.status === 200,
            })) {
                this.countDeletePayrollOk.add(response.status === 200)
            } else {
                console.error(`deletePayrollByPeriod ${year}${monthPeriod} ${response.body}`)
            }
        })

        setSleep(0.5, 1);

        return response
    }

    /**
     * Get the list of employees availble
     * 
     * @param token 
     * @param PeriodTypeEnum 
     * @param year 
     * @param month 
     * @returns 
     */
    public getEmployeesAvailableUsed(token: string, PeriodTypeEnum: number, year: number, month: number) {

        let response = {} as RefinedResponse<any>

        const body = JSON.stringify({
            "PeriodTypeEnum": PeriodTypeEnum,
            "year": year,
            "month": month
        })

        group("getEmployeesAvailableUsed", () => {
            response = http.post(
                `${this.config.nominaUrl}/GetEmployeesAvailableUsed`,
                body,
                {
                    headers: Payroll.headers(token),
                    tags: {
                        name: 'getEmployeesAvailableUsed',
                    },
                }
            );

            if (check(response, {
                'status is 200': () => response.status === 200,
                'It\'s a list': () => Array.isArray(response.json())
            })) {
                this.countGetEmployees.add(response.status === 200)
            } else {
                console.error(`Employees. Request body: ${body}. response.status: ${response.status}. Response body: ${response.body}`)
            }
        })

        setSleep(0.5, 1);

        return response
    }
}
