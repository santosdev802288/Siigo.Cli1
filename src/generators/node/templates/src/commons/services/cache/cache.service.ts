import { Injectable } from '@nestjs/common'
import * as CacheManager from 'cache-manager'
@Injectable()
export class CacheService {
  memoryCache: CacheManager.Cache
  ttl = 5
  constructor() {
    this.memoryCache = CacheManager.caching({
      store: 'memory',
      ttl: 10 /*seconds*/,
    })
  }
  async setValue(key, value) {
    return await this.memoryCache.set(key, value, { ttl: this.ttl }, err => {
      if (err) {
        return err
      }
    })
  }
  async getValue(key) {
    return await this.memoryCache.get(key)
  }
}
