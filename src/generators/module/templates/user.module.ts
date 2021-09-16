import { Module } from '@nestjs/common'
import { <%= config.nameUpper %>Controller } from './<%= config.name %>.controller'
import { <%= config.nameUpper %>Service } from './<%= config.name %>.service'
import { <%= config.nameUpper %>Repository } from './<%= config.name %>.repository'
import { <%= config.nameUpper %>RepositoryToken, <%= config.nameUpper %>ServiceToken } from './constans'
import { CoreModule } from '@siigo/core'


@Module({
    controllers: [<%= config.nameUpper %>Controller],
    providers: [
        {
            provide: <%= config.nameUpper %>ServiceToken,
            useClass: <%= config.nameUpper %>Service,
        },
        {
            provide: <%= config.nameUpper %>RepositoryToken,
            useClass: <%= config.nameUpper %>Repository,
        },
    ],
    imports: [CoreModule],
    exports: [
        {
            provide: <%= config.nameUpper %>RepositoryToken,
            useClass: <%= config.nameUpper %>Repository,
        },
    ],
})
export class <%= config.nameUpper %>Module {}
