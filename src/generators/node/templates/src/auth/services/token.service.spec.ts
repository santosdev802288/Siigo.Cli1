import { Test, TestingModule } from '@nestjs/testing'
import { TokenService } from './token.service'

const mockTokenService = () => ({})

describe('TokenService', () => {
  let tokenService: TokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: TokenService, useFactory: mockTokenService }],
    }).compile()

    tokenService = module.get<TokenService>(TokenService)
  })

  it('tokenService should be defined', () => {
    expect(tokenService).toBeDefined()
  })
})
