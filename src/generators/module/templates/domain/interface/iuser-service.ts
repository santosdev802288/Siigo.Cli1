import { Service } from '@siigo/core-security'
import {Observable} from 'rxjs'

export interface I<%= config.nameUpper %>Service<T> extends Service<T> {
    <%= config.name %>(): Observable<string>
}
