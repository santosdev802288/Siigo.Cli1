import { AccountService } from '../../services/account/account.service'
import { Controller, Request, Get, Param } from '@nestjs/common'

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':accountId/contacts')
  async getContacts(@Param() params, @Request() req) {
    return await this.accountService
      .getContacts(params.accountId, req.user.companyKey)
      .catch(error => error)
  }
}
