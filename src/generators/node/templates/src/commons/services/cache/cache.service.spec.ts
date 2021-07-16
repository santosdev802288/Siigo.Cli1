import { Test, TestingModule } from '@nestjs/testing'
import { CacheService } from './cache.service'

describe('CacheService', () => {
  let cacheService: CacheService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile()

    cacheService = module.get<CacheService>(CacheService)
  })

  it('CacheService should be defined', () => {
    expect(cacheService).toBeDefined()
  })
})
