import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { TokenService } from './../../auth/services/token.service'
import { JsonWebTokenError } from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: any, res: any, next: () => void) {
    if (req.headers.authorization || req.query.authorization) {
      try {
        let token = req.headers.authorization
        if (!token) {
          token = req.query.authorization
        }
        const result = await this.tokenService.getTokenWebInformation(token)
        const user = {
          companyKey: result.data.cloud_tenant_company_key,
          mail_siigo: result.data.mail_siigo,
          sToken: result.apiToken,
        }
        req.user = user
        req.newAuthData = result.newAuthData
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new HttpException(
            'Token invalido - ' + error.message,
            HttpStatus.UNAUTHORIZED,
          )
        }
        if (error?.response?.status === HttpStatus.BAD_REQUEST) {
          throw new HttpException(
            error.response.statusText,
            HttpStatus.BAD_REQUEST,
          )
        } else if (error?.status === HttpStatus.PRECONDITION_FAILED) {
          throw new HttpException(
            'Error: user not active',
            HttpStatus.PRECONDITION_FAILED,
          )
        } else {
          if (
            error.response &&
            error.response.hasOwnProperty('status') &&
            error.response.hasOwnProperty('statusText')
          ) {
            throw new HttpException(
              error.response.statusText,
              error.response.status,
            )
          }
          throw error
        }
      }
    } else {
      throw new HttpException(
        'Faltan Parametros en los headers',
        HttpStatus.FORBIDDEN,
      )
    }
    next()
  }
}
