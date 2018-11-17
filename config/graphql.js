import resolvers from './graphql/resolvers'
import context from './graphql/context'
import * as schemaDirectives from './graphql/directives'
import typeDefs from './graphql/schema'
import formatError from './graphql/errors'

export default {
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
  formatError
}
