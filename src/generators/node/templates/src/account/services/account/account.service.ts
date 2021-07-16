import { Injectable } from '@nestjs/common'
import { SqlServerService } from '../../../commons/services/sql-server/sql-server.service'

@Injectable()
export class AccountService {
  constructor(private sqlServerService: SqlServerService) {}

  public async getContacts(accountId, companyKey) {
    if (!accountId) {
      throw new Error('accountId is required')
    }
    const mtconn = await this.sqlServerService.getMTConn(companyKey)
    const sql = `
        SELECT ContactID, FullName, EMail, IsPrincipal, Mobile AS Phone FROM Contact
        WHERE AccountCode = ${accountId} ORDER BY IsPrincipal DESC
        `
    const result = (await this.sqlServerService.executeMTQuery(mtconn, sql))
      .recordset
    return result
  }
}
