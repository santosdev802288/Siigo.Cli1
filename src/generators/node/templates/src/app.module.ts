import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AuthMiddleware } from './commons/middleware/auth.middleware'
import { AccountModule } from './account/account.module'
import { AppService } from './app.service'
import { CoreModule } from '@siigo/core'
import {ErrorDetailsFilter} from './error-details.filter'
import {APP_FILTER} from '@nestjs/core'
import { CommonsModule } from './commons/commons.module'
import { AuthModule } from './auth/auth.module'


@Module({
  imports: [CoreModule.forRoot({
    secure: {
        isSecure: false,
        config: null, // inject your service that implements IdentityConfig
    },
    deps: [], // inject deps of your services
}),
AccountModule,
CommonsModule,
AuthModule,
],
  providers: [{
    provide: APP_FILTER,
    useClass: ErrorDetailsFilter,
},
AppService],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('accounts')

    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/login-with-token', method: RequestMethod.GET })
  }
}
