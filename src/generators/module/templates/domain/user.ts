import { Builder, Build } from '@siigo/core'

@Builder
export class <%= config.nameUpper %> {

    public readonly builder?: () => Build<this>
}
