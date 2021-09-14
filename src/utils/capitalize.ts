import _ from 'lodash'

export function capitalize(s: string | null): string {
  if (typeof s !== 'string' || s == null) return ''
  return _.capitalize(s)
}
