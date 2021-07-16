import { Test, TestingModule } from '@nestjs/testing'
import { DecryptService } from './decrypt.service'

describe('DecryptService', () => {
  let decryptService: DecryptService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecryptService],
    }).compile()

    decryptService = module.get<DecryptService>(DecryptService)
  })

  it('DecryptService should be defined', () => {
    expect(decryptService).toBeDefined()
  })
})
