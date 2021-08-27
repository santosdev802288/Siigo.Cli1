import {Observable} from 'rxjs'
import { Repository } from '@siigo/core'

export interface I<%= config.nameUpper %>Repository<T> extends Repository<T> {
    <%= config.name %>(): Observable<string>
}
