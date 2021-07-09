import { Inject, Injectable } from '@nestjs/common'
import { <%= config.nameUpper %> } from './domain/<%= config.name %>'
import { I<%= config.nameUpper %>Repository } from './domain/interface/i<%= config.name %>-repository'
import { <%= config.nameUpper %>RepositoryToken } from './constans'
import { I<%= config.nameUpper %>Service } from './domain/interface/i<%= config.name %>-service'
import {Observable} from 'rxjs'

@Injectable()
export class <%= config.nameUpper %>Service implements I<%= config.nameUpper %>Service<<%= config.nameUpper %>> {
    /**
     *
     * @param <%= config.name %>Repository
     */
    constructor(
        @Inject(<%= config.nameUpper %>RepositoryToken)
        private readonly <%= config.name %>Repository: I<%= config.nameUpper %>Repository<<%= config.nameUpper %>>,
    ) {}

    public <%= config.name %>(): Observable<string> {
        return this.<%= config.name %>Repository.<%= config.name %>()
    }

}
