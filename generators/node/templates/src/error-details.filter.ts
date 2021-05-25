import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common'
import {Response} from 'express'
import {ErrorDetails, LoggerService} from '@siigo/core'

/**
 * handler errors
 */
@Catch(HttpException)
export class ErrorDetailsFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {
    }

    /***
     * Handle all exceptions
     * @param exception
     * @param host
     */
    public catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()

        this.logger.error(
            exception.message,
            exception.stack,
            'HttpException',
        )

        response.status(status).json(
            new ErrorDetails()
                .builder()
                .code(String(status))
                .status(status)
                .message(exception.message)
                .detail(exception.stack)
                .sent_date(new Date().toLocaleDateString())
                .build(),
        )
    }
}
