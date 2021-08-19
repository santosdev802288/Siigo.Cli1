import { Controller, Get, Inject, Logger } from '@nestjs/common'
import { <%= config.nameUpper %> } from './domain/<%= config.name %>'
import { <%= config.nameUpper %>ServiceToken } from './constans'
import { I<%= config.nameUpper %>Service } from './domain/interface/i<%= config.name %>-service'
import {Observable} from 'rxjs'

@Controller('<%= config.name %>')
export class <%= config.nameUpper %>Controller {
    private static readonly logger = new Logger(<%= config.nameUpper %>Controller.name)
    /**
     *
     * @param <%= config.name %>Service
     * @param logger
     */
    constructor(
        @Inject(<%= config.nameUpper %>ServiceToken) private readonly <%= config.name %>Service: I<%= config.nameUpper %>Service<<%= config.nameUpper %>>,
    ) {}

    /**
     *
     */
    @Get()
    public <%= config.name %>(): Observable<string> {
            <%= config.nameUpper %>Controller.logger.log({message: 'Controller', 'trace_id': '120123239'})
            return this.<%= config.name %>Service.<%= config.name %>()
        }

}
