import {Module} from '@nestjs/common'
import {CoreModule} from '@siigo/core-security'
import {ErrorDetailsFilter} from './error-details.filter'
import {APP_FILTER} from '@nestjs/core'

@Module({
    imports: [
        CoreModule.forRoot({
            secure: {
                isSecure: false,
                config: null, // inject your service that implements IdentityConfig
            },
            deps: [], // inject deps of your services
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorDetailsFilter,
        },
    ],
})
export class AppModule {
}
