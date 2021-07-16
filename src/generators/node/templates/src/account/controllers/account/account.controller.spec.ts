import { Test, TestingModule } from '@nestjs/testing'
import { AccountController } from './account.controller'
import { AccountService } from '../../services/account/account.service'

const mockAccountService = () => ({})

describe('Account services', () => {
  let accountService: AccountService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        { provide: AccountService, useFactory: mockAccountService },
      ],
    }).compile()

    accountService = await module.get<AccountService>(AccountService)
  })

  it('Account services should be defined', () => {
    expect(accountService).toBeDefined()
  })
})
