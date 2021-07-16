import { ClientSecretCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'
import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as Joi from 'joi'
import { SignOptions } from 'jsonwebtoken'
import { Pkcs12ReadResult, readPkcs12 } from 'pem'

export interface EnvConfig {
  [key: string]: string
}
@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string }
  private certificate: Pkcs12ReadResult
  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(3000),
      DATABASECONTROL_SERVER: Joi.string(),
      DATABASECONTROL_USER: Joi.string(),
      DATABASECONTROL_PASSWORD: Joi.string(),
      DATABASECONTROL_NAME: Joi.string(),
      DATABASECONTROL_PORT: Joi.number(),
      DATABASECONTROL_ENCRYPT: Joi.boolean(),
      JWT_EXPIRESIN: Joi.string(),
      JWT_ALGORITHM: Joi.string(),
      AZURE_CLIENT_ID: Joi.string(),
      AZURE_CLIENT_SECRET: Joi.string(),
      AZURE_TENANT_ID: Joi.string(),
      AZURE_URL_KEYVAULT: Joi.string(),
      AZURE_SECRERT_CERTIFICATENAME: Joi.string(),
    })
    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    )
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }
  get port(): number {
    return Number(process.env.PORT || this.envConfig.PORT)
  }
  get environment(): string {
    return String(process.env.NODE_ENV || this.envConfig.NODE_ENV)
  }

  async loadCertificate() {
    if (this.certificate) {
      return this.certificate
    } else {
      const credential = new ClientSecretCredential(
        String(process.env.AZURE_TENANT_ID || this.envConfig.AZURE_TENANT_ID),
        String(process.env.AZURE_CLIENT_ID || this.envConfig.AZURE_CLIENT_ID),
        String(
          process.env.AZURE_CLIENT_SECRET || this.envConfig.AZURE_CLIENT_SECRET,
        ),
      )
      const url = String(
        process.env.AZURE_URL_KEYVAULT || this.envConfig.AZURE_URL_KEYVAULT,
      )
      const client = new SecretClient(url, credential)
      const secretName = String(
        process.env.AZURE_SECRERT_CERTIFICATENAME ||
          this.envConfig.AZURE_SECRERT_CERTIFICATENAME,
      )
      const latestSecret = await client.getSecret(secretName)
      const pfx = Buffer.from(latestSecret.value, 'base64')
      const cert = await this.getCertificateFromPfx(pfx)
      this.certificate = cert as Pkcs12ReadResult
      return cert as Pkcs12ReadResult
    }
  }

  async getCertificateFromPfx(pfx: Buffer) {
    return new Promise((resolve, reject) => {
      readPkcs12(pfx, (err, cert) => {
        if (err) return reject(err)
        resolve(cert)
      })
    })
  }

  get dbControlConfig(): any {
    let port = Number(process.env.DATABASECONTROL_PORT)
    if (!port) {
      port =
        this.envConfig.DATABASECONTROL_PORT === '0'
          ? null
          : Number(this.envConfig.DATABASECONTROL_PORT)
    }
    return {
      server:
        process.env.DATABASECONTROL_SERVER ||
        this.envConfig.DATABASECONTROL_SERVER,
      user:
        process.env.DATABASECONTROL_USER || this.envConfig.DATABASECONTROL_USER,
      password:
        process.env.DATABASECONTROL_PASSWORD ||
        this.envConfig.DATABASECONTROL_PASSWORD,
      database:
        process.env.DATABASECONTROL_NAME || this.envConfig.DATABASECONTROL_NAME,
      port: port,
      options: {
        encrypt: process.env.DATABASECONTROL_ENCRYPT
          ? JSON.parse(process.env.DATABASECONTROL_ENCRYPT)
          : this.envConfig.DATABASECONTROL_ENCRYPT,
          trustServerCertificate: true,
      },
    }
  }

  get jwtSignOptions(): SignOptions {
    return {
      algorithm: String(
        process.env.JWT_ALGORITHM || this.envConfig.JWT_ALGORITHM,
      ),
      expiresIn: String(
        process.env.JWT_EXPIRESIN || this.envConfig.JWT_EXPIRESIN,
      ),
    } as SignOptions
  }
}
