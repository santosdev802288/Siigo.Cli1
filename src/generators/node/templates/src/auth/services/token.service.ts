import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '../../config/config.service'

@Injectable()
export class TokenService {
  constructor(private config: ConfigService, private jwtService: JwtService) {}

  getTokenInformation(token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }
    return this.jwtService.verify(token)
  }

  async getTokenWebInformation(token) {
    try {
      const data = await this.validateToken(token)
      return {
        apiToken: token,
        data: data,
        newAuthData: null,
      }
    } catch (error) {
      throw new HttpException(
        'error al validar el token',
        HttpStatus.UNAUTHORIZED,
      )
    }
  }

  async validateToken(token) {
    const data = await this.jwtService.verifyAsync(
      token,
      Object.assign(this.config.jwtSignOptions, { ignoreNotBefore: true }),
    )
    return data
  }
}
