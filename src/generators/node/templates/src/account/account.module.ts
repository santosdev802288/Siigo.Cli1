import { ConfigModule } from '../config/config.module'
import { CommonsModule } from '../commons/commons.module'
import { Module } from '@nestjs/common'
import { AccountController } from './controllers/account/account.controller'
import { AccountService } from './services/account/account.service'

@Module({
  imports: [CommonsModule, ConfigModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
