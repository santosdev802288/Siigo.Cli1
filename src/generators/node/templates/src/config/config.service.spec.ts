import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from './config.service'

const mockConfigService = () => ({})

describe('ConfigServiceService', () => {
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile()

    configService = module.get<ConfigService>(ConfigService)
  })

  it('configservices should be defined', () => {
    expect(configService).toBeDefined()
  })
})
