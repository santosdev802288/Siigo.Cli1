import { CacheService } from './services/cache/cache.service'
import { DecryptService } from './services/decrypt/decrypt.service'
import { SqlServerService } from './services/sql-server/sql-server.service'
import { ConfigModule } from './../config/config.module'
import { Module, HttpModule } from '@nestjs/common'

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [SqlServerService, DecryptService, CacheService],
  exports: [SqlServerService, DecryptService, CacheService],
})
export class CommonsModule {}
