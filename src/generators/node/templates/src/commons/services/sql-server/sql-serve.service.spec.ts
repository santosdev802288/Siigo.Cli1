import { Test } from '@nestjs/testing'
import { SqlServerService } from './sql-server.service'

const mockSqlServerService = () => ({})

describe('SqlServerService', () => {
  let sqlServerService: SqlServerService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: SqlServerService, useFactory: mockSqlServerService },
      ],
    }).compile()

    sqlServerService = await module.get<SqlServerService>(SqlServerService)
  })

  it('SqlServerService should be defined', () => {
    expect(sqlServerService).toBeDefined()
  })
})
