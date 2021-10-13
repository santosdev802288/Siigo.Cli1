import {FreeTextBuilder} from "./widgets/free.text";
import {SloBuilder} from "./widgets/slo";

const layoutWithText = 24
const layoutHeightText = 6
const definitionColor = '#4d4d4d'
const definitionFontSize = '36'
const definitionTextAlign = 'left'
const layoutWidthSlo = 60
const layoutHeightSlo = 21
const definitionTitleSize = '16'
const definitionTitleAlign = 'left'
const definitionViewType = 'detail'
const definitionTimeWindows = ['7d', 'previous_month', 'global_time']
const definitionShowErrorBudget = true
const definitionViewMode = 'overall'
const definitionGlobalTimeTarget = '99.75'

export function setFreeText(info: any): FreeTextBuilder {
    const freeText: FreeTextBuilder = new FreeTextBuilder()
    return freeText
        .LayoutX(info.layoutX)
        .LayoutY(info.layoutY)
        .LayoutWidth(layoutWithText)
        .LayoutHeight(layoutHeightText)
        .DefinitionText(info.definitionText)
        .DefinitionColor(definitionColor)
        .DefinitionFontSize(definitionFontSize)
        .DefinitionTextAlign(definitionTextAlign)
}

export function setSLOInfo(sloInfo: any): SloBuilder {
    const slo: SloBuilder = new SloBuilder()
    return slo
        .LayoutX(sloInfo.layoutX)
        .LayoutY(sloInfo.layoutY)
        .LayoutWidth(layoutWidthSlo)
        .LayoutHeight(layoutHeightSlo)
        .DefinitionTitleSize(definitionTitleSize)
        .DefinitionTitleAlign(definitionTitleAlign)
        .DefinitionViewType(definitionViewType)
        .DefinitionTimeWindows(definitionTimeWindows)
        .DefinitionSloId(sloInfo.definitionSloId)
        .DefinitionShowErrorBudget(definitionShowErrorBudget)
        .DefinitionViewMode(definitionViewMode)
        .DefinitionGlobalTimeTarget(definitionGlobalTimeTarget)
}