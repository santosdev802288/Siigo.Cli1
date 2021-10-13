import { readFileSync, writeFileSync } from 'fs';
import {Dashboard} from "./dashboard";
import path = require("path")

export class DashboardHandler {

    private readonly TERRAGRUNT_PATH: string = path.resolve(__dirname, 'datadog-sli/tribe/dashboard/terragrunt.hcl')

    private contentFile: string = ""
    private dashboardsText: string = ""
    private dashboardDependencies: string = ""
    private _dependencies: string = ""
    private _dashboards: Dashboard[] = []

    constructor(msName: string) {
        this.contentFile = readFileSync(this.TERRAGRUNT_PATH, 'utf-8')

        this.dashboardDependencies = this.contentFile.substring(
            this.contentFile.lastIndexOf('//start') + 7,
            this.contentFile.indexOf('//fin')
        )

        this.dashboardsText = this.contentFile.substring(
            this.contentFile.lastIndexOf('//begin') + 7,
            this.contentFile.indexOf('//end')
        )

      this._dependencies = this.dashboardDependencies +
        'dependency "datadog-slo-'+msName+'" {\n  config_path = "../slo/' + msName + '"\n}\n'

      this._dashboards = JSON.parse(this.dashboardsText)
    }

    get dashboards(): Dashboard[] {
      return this._dashboards
    }

    addDashboard(dashboard: Dashboard): void {
        this._dashboards.push(dashboard)
    }

    save(){
        const tmpFile = this.contentFile.replace(this.dashboardDependencies, this._dependencies)
        const newFile = tmpFile.replace(this.dashboardsText,  JSON.stringify(this._dashboards, null, 2))
        writeFileSync(this.TERRAGRUNT_PATH, newFile)
    }

}