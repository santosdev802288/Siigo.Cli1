import { Builder, Build } from '@siigo/core-security'

@Builder
export class <%= config.nameUpper %> {

    constructor() {}

    public readonly builder?: () => Build<this>
}
