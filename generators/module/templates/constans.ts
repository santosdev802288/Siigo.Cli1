/**
 * key to inject _<%= config.name %> service
 */
export const <%= config.nameUpper %>ServiceToken = Symbol('_<%= config.name %> service token')

/**
 * key to inject _<%= config.name %> repository
 */
export const <%= config.nameUpper %>RepositoryToken = Symbol('_<%= config.name %> repository token')
