import {Layout} from "./common";

interface Definition {
    title: string
    title_size: string
    title_align: string
    type: string
    view_type: string
    time_windows: string[]
    slo_id: string
    show_error_budget: boolean
    view_mode: string
    global_time_target: string
}

export interface Slo {
    layout: Layout
    definition: Definition
}

export class SloBuilder {

    private readonly TYPE: string = "slo"
    private x: number = 0
    private y: number = 0
    private width: number = 0
    private height: number = 0
    private title: string = ""
    private titleSize: string = ""
    private titleAlign: string = ""
    private viewType: string = ""
    private timeWindows: string[] = []
    private sloId: string = ""
    private showErrorBudget: boolean = false
    private viewMode: string = ""
    private globalTimeTarget: string = ""

    LayoutX(x: number): SloBuilder {
        this.x = x
        return this
    }

    LayoutY(y: number): SloBuilder {
        this.y = y
        return this
    }

    LayoutWidth(width: number): SloBuilder {
        this.width = width
        return this
    }

    LayoutHeight(height: number): SloBuilder {
        this.height = height
        return this
    }

    DefinitionTitle(title: string): SloBuilder {
        this.title = title
        return this
    }

    DefinitionTitleSize(titleSize: string): SloBuilder {
        this.titleSize = titleSize
        return this
    }

    DefinitionTitleAlign(titleAlign: string): SloBuilder {
        this.titleAlign = titleAlign
        return this
    }

    DefinitionViewType(viewType: string): SloBuilder {
        this.viewType = viewType
        return this
    }

    DefinitionTimeWindows(timeWindows: string[]): SloBuilder {
        this.timeWindows = timeWindows
        return this
    }

    DefinitionSloId(sloId: string): SloBuilder {
        this.sloId = "${" + sloId + "}"
        return this
    }

    DefinitionShowErrorBudget(showErrorBudget: boolean): SloBuilder {
        this.showErrorBudget = showErrorBudget
        return this
    }

    DefinitionViewMode(viewMode: string): SloBuilder {
        this.viewMode = viewMode
        return this
    }

    DefinitionGlobalTimeTarget(globalTimeTarget: string): SloBuilder {
        this.globalTimeTarget = globalTimeTarget
        return this
    }

    build(): Slo {
        return {
            layout: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            },
            definition: {
                title: this.title,
                title_size: this.titleSize,
                title_align: this.titleAlign,
                type: this.TYPE,
                view_type: this.viewType,
                time_windows: this.timeWindows,
                slo_id: this.sloId,
                show_error_budget: this.showErrorBudget,
                view_mode: this.viewMode,
                global_time_target: this.globalTimeTarget
            }
        }
    }

}