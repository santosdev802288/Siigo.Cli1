import { Builder, Build } from '@siigo/core'

@Builder
export class <%= config.nameUpper %> {

    constructor() {}

    public readonly builder?: () => Build<this>
}
