import {Layout} from "./common";

export interface Definition {
    type: string
    text: string
    color: string
    font_size: string
    text_align: string
}

export interface FreeText {
    layout: Layout
    definition: Definition
}

export class FreeTextBuilder {

    private readonly TYPE: string = "free_text"
    private x: number = 0
    private y: number = 0
    private width: number = 0
    private height: number = 0
    private text: string = ""
    private color: string = ""
    private fontSize: string = ""
    private textAlign: string = ""


    LayoutX(x: number): FreeTextBuilder {
        this.x = x
        return this
    }

    LayoutY(y: number): FreeTextBuilder {
        this.y = y
        return this
    }

    LayoutWidth(width: number): FreeTextBuilder {
        this.width = width
        return this
    }

    LayoutHeight(height: number): FreeTextBuilder {
        this.height = height
        return this
    }

    DefinitionText(text: string): FreeTextBuilder {
        this.text = text
        return this
    }

    DefinitionColor(color: string): FreeTextBuilder {
        this.color = color
        return this
    }

    DefinitionFontSize(fontSize: string): FreeTextBuilder {
        this.fontSize = fontSize
        return this
    }

    DefinitionTextAlign(textAlign: string): FreeTextBuilder {
        this.textAlign = textAlign
        return this
    }

    build(): FreeText {
        return {
            layout: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
            },
            definition: {
                type: this.TYPE,
                text: this.text,
                color: this.color,
                font_size: this.fontSize,
                text_align: this.textAlign
            }
        }
    }
}