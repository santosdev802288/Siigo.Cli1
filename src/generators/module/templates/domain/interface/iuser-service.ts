import { Service } from '@siigo/core'
import {Observable} from 'rxjs'

export interface I<%= config.nameUpper %>Service<T> extends Service<T> {
    <%= config.name %>(): Observable<string>
}
