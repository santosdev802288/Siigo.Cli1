import { Injectable, Scope } from '@nestjs/common'
import { <%= config.nameUpper %> } from './domain/<%= config.name %>'
import { I<%= config.nameUpper %>Repository } from './domain/interface/i<%= config.name %>-repository'
import {Observable, of} from 'rxjs'

@Injectable({ scope: Scope.REQUEST })
export class <%= config.nameUpper %>Repository implements I<%= config.nameUpper %>Repository<<%= config.nameUpper %>> {

    constructor() {}

    public <%= config.name %>(): Observable<string> {
        return of('Enjoy!')
    }
}
