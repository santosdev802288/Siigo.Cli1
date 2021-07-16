import { CommonsModule } from './../commons/commons.module'
import { ConfigModule } from '../config/config.module'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './services/token.service'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    CommonsModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        publicKey: (await configService.loadCertificate()).cert,
        privateKey: (await configService.loadCertificate()).key,
        signOptions: configService.jwtSignOptions,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class AuthModule {}
