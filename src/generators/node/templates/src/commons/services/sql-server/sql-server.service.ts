import { CacheService } from './../cache/cache.service'
import { DecryptService } from './../decrypt/decrypt.service'
import { MtConnection } from '../../dto/mtconnection.dto'
import { ConfigService } from './../../../config/config.service'
import { Injectable } from '@nestjs/common'
import * as mssql from 'mssql'

@Injectable()
export class SqlServerService {
  constructor(
    private config: ConfigService,
    private decryptService: DecryptService,
    private cacheService: CacheService,
  ) {}

  async testConnection(config: any) {
    try {
      const pool = await new mssql.ConnectionPool(config).connect()
      pool.on('error', err => {
        return err
      })
      const result = await pool.request().query('SELECT 1 test')
      pool.close()
      return result
    } catch (err) {
      // ... error checks
    }
  }

  async executeQueryDB(config: any, query: any, params: any = []) {
    try {
      if (!params) {
        const pool = await new mssql.ConnectionPool(config).connect()
        pool.on('error', err => {
          return err
        })
        const result = await pool.request().query(query)
        pool.close()
        return result
      } else {
        const pool = await new mssql.ConnectionPool(config).connect()
        pool.on('error', err => {
          return err
        })
        const request = pool.request()
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < params.length; index++) {
          const element = params[index]
          request.input(element.field, element.value)
        }
        const result = await request.query(query)
        pool.close()
        return result
      }
    } catch (err) {
      return err
    }
  }

  async testConn() {
    const res: any = await this.testConnection(this.config.dbControlConfig)
    return res
  }

  executeQuery(query: string) {
    return this.executeQueryDB(this.config.dbControlConfig, query)
  }

  executeMTQuery(connParams: MtConnection, query: string) {
    const defaultPort = 1433
    const connection = {
      server:
        connParams.elasticIP === '.'
          ? 'localhost'
          : connParams.elasticIP.split(',')[0], // para quitar el puerto de la conexion MI
      port: Number(connParams.elasticIP.split(',')[1] || defaultPort),
      user: connParams.user,
      password: connParams.password,
      database: connParams.database,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }
    return this.executeQueryDB(connection, query)
  }

  async getMTConn(companyKey: string, clearConenction = false) {
    let connection: MtConnection = new MtConnection()
    const value = await this.cacheService.getValue(companyKey + 'MTCNN')
    if (!clearConenction && value) {
      connection = JSON.parse(value)
    } else {
      let cloudServerConnection = 'ElasticIP'
      if (this.config.environment != 'production') {
        cloudServerConnection = 'PublicDNS'
      }
      const query = `
            select
            cloudtenant.CloudTenantConnectionUser,
            cloudtenant.CloudTenantConnectionPassword,
            CloudMultiTenant.CloudMultiTenantName,
            CloudServer.${cloudServerConnection}
            from cloudtenant
            inner join CloudMultiTenant on cloudtenant.CloudMultiTenantCode = CloudMultiTenant.CloudMultiTenantID
            inner join CloudServer on CloudServer.CloudServerID = CloudMultiTenant.CloudServerCode
            where CloudTenantCompanyKey = '${companyKey}'`
      const result = await this.executeQuery(query)
        .then(res => {
          if (res.recordset.length > 0) {
            return res.recordset[0]
          } else {
            return null
          }
        })
        .catch(err => {
          return null
        })
      if (result) {
        const ip = result[cloudServerConnection].split(',')
        const ElasticIP = ip[0]
        let Port = 1433
        if (ip.length > 1) {
          Port = parseInt(ip[1], 10)
        }
        connection.database = result.CloudMultiTenantName
        connection.user = result.CloudTenantConnectionUser
        connection.elasticIP = ElasticIP
        connection.port = Port
        connection.password = result.CloudTenantConnectionPassword
      }
      this.cacheService.setValue(
        companyKey + 'MTCNN',
        JSON.stringify(connection),
      )
    }
    connection.password = this.decryptService.decodeBase64(connection.password)
    return connection
  }
}
