import {FreeText} from "./widgets/free.text";
import {Slo} from "./widgets/slo";


export interface Dashboard {
    title: string
    description: string
    free_texts: any[]
    slos: any[]
    monitors: any[]
    timeseries: any[]
    servicemap: any[]
    template_variables: any[]
    layout_type: string
    is_read_only: boolean
    notify_list: any[]
    id: string
    dependencies: any[]
}



export class DashboardBuilder {

    private readonly ID: string = "h4s-f5e-qjh"
    private readonly IS_READ_ONLY: boolean = false
    private readonly NOTIFY_LIST: any[] = []

    private title: string = ""
    private description: string = ""
    private free_texts: FreeText[] = []
    private slos: Slo[] = []
    private monitors: Slo[] = []
    private timeseries: any[] = []
    private servicemap: any[] = []
    private template_variables: any[] = []
    private layout_type: string = ""
    private dependencies : any[] = []

    constructor(title: string, description: string) {
        this.title = title
        this.description = description
    }

    setFreeText(freeText: FreeText[]): DashboardBuilder {
        this.free_texts = freeText
        return this
    }

    setSlos(slos: Slo[]): DashboardBuilder{
        this.slos = slos
        return this
    }

    setMonitors(monitors: Slo[]): DashboardBuilder{
        this.monitors = monitors
        return this
    }

    setTimeSeries(timeSeries: any[]): DashboardBuilder{
        this.timeseries = timeSeries
        return this
    }

    setServiceMap(serviceMap: any[]): DashboardBuilder{
        this.servicemap = serviceMap
        return this
    }

    setTemplateVariables( templateVariables: any[]): DashboardBuilder{
        this.template_variables = templateVariables
        return this
    }

    setLayoutType(layoutType: string): DashboardBuilder {
        this.layout_type = layoutType
        return this
    }

    setDependencies( dependencies: any[]): DashboardBuilder{
        this.dependencies = dependencies
        return this
    }

    build(): Dashboard {
        return {
            title: this.title,
            description: this.description,
            free_texts: this.free_texts,
            slos: this.slos,
            monitors: this.monitors,
            timeseries: this.timeseries,
            servicemap: this.servicemap,
            template_variables: this.template_variables,
            layout_type: this.layout_type,
            is_read_only: this.IS_READ_ONLY,
            notify_list: this.NOTIFY_LIST,
            id: this.ID,
            dependencies: this.dependencies
        }
    }

}