import { SqlServerService } from './../../../commons/services/sql-server/sql-server.service'
import { AccountServiceMock } from './account.service.mock'
import { DecryptService } from './../../../commons/services/decrypt/decrypt.service'
import { ConfigService } from './../../../config/config.service'
import { Test, TestingModule } from '@nestjs/testing'
import { AccountService } from './account.service'

// tslint:disable-next-line:max-classes-per-file
class SqlServerServiceMock {
  public static case = 0
  getMTConn(companyKey) {
    return null
  }

  executeMTQuery(mtconn, sql: string) {
    const result = AccountServiceMock.executeMTQuery[SqlServerServiceMock.case]
    return result
  }
}

// tslint:disable-next-line:max-classes-per-file
class ConfigServiceMock {
  public siigoAppVirtualPath = ''
}

// tslint:disable-next-line:max-classes-per-file
class DecryptServiceMock {
  public static case = 0
  encode(value: string) {
    return value
  }
  decodeBase64(value: string) {
    return value
  }
  ToBase64(value: string) {
    return value
  }
}

function createMock(provide, useClass) {
  return {
    provide,
    useClass,
  }
}

describe('AccountService', () => {
  let service: AccountService
  let decryptService: DecryptService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        createMock(SqlServerService, SqlServerServiceMock),
        createMock(ConfigService, ConfigServiceMock),
        createMock(DecryptService, DecryptServiceMock),
        AccountService,
      ],
    }).compile()

    service = module.get<AccountService>(AccountService)
    decryptService = module.get<DecryptService>(DecryptService)
  })

  it('All dependecies should be delared, you must declare all dependencies in testing module', () => {
    expect(service).not.toBeUndefined()
    expect(decryptService).not.toBeUndefined()
  })
})
