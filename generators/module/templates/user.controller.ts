import { Controller, Get, Inject, Param } from '@nestjs/common'
import { <%= config.nameUpper %> } from './domain/<%= config.name %>'
import { <%= config.nameUpper %>ServiceToken } from './constans'
import { I<%= config.nameUpper %>Service } from './domain/interface/i<%= config.name %>-service'
import {Observable} from 'rxjs'

@Controller('<%= config.name %>')
export class <%= config.nameUpper %>Controller {
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
            return this.<%= config.name %>Service.<%= config.name %>()
        }

}
