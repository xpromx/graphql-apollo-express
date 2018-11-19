import {
  SchemaDirectiveVisitor,
  AuthenticationError
} from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    const { role } = this.args

    field.resolve = async function (...args) {
      const context = args[2]
      const info = args[args.length - 1]

      if (!context.auth) {
        if ('operation' in info && info.operation.operation === 'mutation') {
          throw new AuthenticationError('you must be logged in')
        }

        return null
      }

      // check roles if key exists
      if ('roles' in context.auth && !context.auth.roles.includes(role)) {
        return null
      }

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
